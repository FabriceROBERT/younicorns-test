import React from "react";
import Typography from "./Typography";
import Wait from "../assets/GIF/Magic Soou.gif";
import "../styles/CSVTable.css";
import Button from "../components/Button";
import exportToCSV from "../utils/exportToCSV";

// Ce composant CSVTable permet d'afficher les données d'un fichier CSV dans un tableau.

export default function CSVTable({ initialData }) {
  const [data, setData] = React.useState(initialData || []); // Valeur par défaut pour éviter undefined
  const [filename, setFilename] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: "ascending",
  });
  const [filterText, setFilterText] = React.useState("");
  const [draggingCell, setDraggingCell] = React.useState(null); // État pour suivre la cellule en cours de déplacement

  // Cette fonction me permet d'ajouter une ligne au tableau
  const newRowTemplate = Object.keys(initialData[0] || {}).reduce(
    (acc, key) => ({ ...acc, [key]: "" }),
    {}
  );

  // Cette fonction me permet de supprimer une ligne du tableau
  const handleAddRow = () => {
    setData([...data, { ...newRowTemplate }]);
  };

  // Fonction pour supprimer une ligne
  const handleDeleteRow = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
  };

  // Fonction pour dupliquer une ligne et l'ajouter juste après la ligne sélectionnée
  const handleDuplicateRow = (rowIndex) => {
    const rowToDuplicate = data[rowIndex]; // Récupère la ligne à dupliquer
    const newData = [...data];
    newData.splice(rowIndex + 1, 0, { ...rowToDuplicate }); // Insère la ligne dupliquée juste après la ligne actuelle
    setData(newData); // Met à jour les données avec la nouvelle ligne insérée
  };

  // Utilise useEffect pour mettre à jour les données si initialData change
  React.useEffect(() => {
    setData(initialData || []); // Met à jour les données si initialData change
  }, [initialData]);

  // Fonction pour exporter les données en CSV
  const handleExportCSV = () => {
    const finalFilename = filename ? `${filename}.csv` : "data.csv";
    exportToCSV(data, finalFilename);
  };

  // Je vérifie si le fichier CSV existe et si csv est inscrit dans l'input
  const handleFilenameChange = (e) => {
    const value = e.target.value;
    if (value.endsWith(".csv")) {
      setFilename(value.slice(0, -4)); // Supprime ".csv" si l'utilisateur l'ajoute
    } else {
      setFilename(value);
    }
  };

  // Je récupère data du tableau, si elle existe et puis je vais la mapper juste après
  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

  // Cette fonction me permet de trier les données du tableau
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  // Fonction pour gérer le tri des données
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Fonction pour obtenir l'indicateur de tri
  const getSortIndicator = (header) => {
    if (sortConfig.key === header) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return null;
  };

  // Fonction pour gérer le changement de cellule
  const handleCellChange = (rowIndex, header, value) => {
    const newData = [...data];
    newData[rowIndex][header] = value; // Mettre à jour la cellule spécifique
    setData(newData); // Mettre à jour le tableau de données
  };

  // Fonction pour filtrer les données
  // useMemo pour éviter de recalculer à chaque rendu
  const filteredData = React.useMemo(() => {
    return sortedData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [sortedData, filterText]);

  // Fonction pour gérer le début du glisser-déposer
  const handleDragStart = (rowIndex, header) => {
    setDraggingCell({ rowIndex, header });
  };

  // Fonction pour gérer le relâchement du glisser-déposer
  const handleDrop = (targetRowIndex, targetHeader) => {
    if (draggingCell) {
      const newData = [...data];
      const sourceValue = newData[draggingCell.rowIndex][draggingCell.header];
      const targetValue = newData[targetRowIndex][targetHeader];

      newData[draggingCell.rowIndex][draggingCell.header] = targetValue;
      newData[targetRowIndex][targetHeader] = sourceValue;

      setData(newData); // Met à jour les données après l'échange
      setDraggingCell(null);
    }
  };

  // Fonction pour gérer le drag over (maintenir en deplacant la souris)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Affiche un message si le tableau est vide
  if (!data || data.length === 0) {
    return (
      <div className="emptyContainer">
        <div className="imageContainer">
          <img src={Wait} alt="Wait" />
        </div>
        <Typography variant="caption" color="primary">
          Ajoutez un fichier CSV pour commencer.
        </Typography>
      </div>
    );
  }

  // Rendu du tableau
  return (
    <div className="tableContainer">
      <input
        className="inputFilter"
        type="text"
        placeholder="Filtrer..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      {filterText && (
        <Typography className="msgFilter" variant="caption" color="primary">
          {filteredData.length} résultats trouvés
        </Typography>
      )}
      <table className="table" border="1" cellPadding="8" cellSpacing="0">
        {/* Header soit NOM, PRENOM, AGE */}
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                className="thead"
                key={header}
                onClick={() => handleSort(header)}
                style={{ fontWeight: "bold" }}
              >
                {header} {getSortIndicator(header)}
                <br />
                <Typography className="" color="primary" variant="description">
                  Filtrer
                </Typography>
              </th>
            ))}
            <th className="thead">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Je map la liste des lignes */}
          {filteredData.map((row, rowIndex) => (
            // rowindex est l'index de la ligne
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td
                  className="tdHeader"
                  key={colIndex}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(rowIndex, header)}
                >
                  <input
                    type="text"
                    value={row[header]}
                    draggable
                    onDragStart={() => handleDragStart(rowIndex, header)}
                    onChange={(e) =>
                      handleCellChange(rowIndex, header, e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </td>
              ))}
              <td className="buttonsContainer">
                <Button
                  variant="small"
                  onClick={() => handleDeleteRow(rowIndex)}
                >
                  Supprimer
                </Button>
                <Button
                  variant="small"
                  onClick={() => handleDuplicateRow(rowIndex)}
                >
                  Dupliquer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="addLine" variant="base" onClick={handleAddRow}>
        Ajouter une ligne
      </Button>
      {data.length > 0 && (
        <>
          <div>
            {data.length === 1
              ? `Le tableau contient ${data.length} ligne`
              : `Nombre de lignes de ce tableau : ${data.length}`}
          </div>
          <div className="exportContainer">
            <input
              className="inputExport"
              placeholder="Nomme ton fichier"
              value={filename}
              type="text"
              onChange={handleFilenameChange}
            />
            {/* Permet de notifier à l'utilisateur que l'extension est deja  ajouté le .csv */}
            <span className="spanCsv">.csv</span>

            <Button onClick={handleExportCSV}>
              <Typography>Exporter en CSV</Typography>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
