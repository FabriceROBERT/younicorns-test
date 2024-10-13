import React from "react";
import Typography from "./Typography";
import Wait from "../assets/GIF/Magic Soou.gif";
import "../styles/CSVTable.css";
import Button from "../components/Button";
import exportToCSV from "../utils/exportToCSV";
import exportToXLSX from "../utils/exportToXLSX";

// Ce composant CSVTable permet d'afficher les données d'un fichier CSV dans un tableau.

export default function CSVTable({ initialData }) {
  const [data, setData] = React.useState(initialData || []);
  const [csvFilename, setCsvFilename] = React.useState("");
  const [xlsxFilename, setXlsxFilename] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: "ascending",
  });
  const [filterText, setFilterText] = React.useState("");
  const [draggingCell, setDraggingCell] = React.useState(null);
  const [exportHistory, setExportHistory] = React.useState([]);

  // Crée une nouvelle ligne avec les mêmes clés que les données initiales
  const newRowTemplate = Object.keys(initialData[0] || {}).reduce(
    (acc, key) => ({ ...acc, [key]: "" }),
    {}
  );

  // Gère l'ajout d'une nouvelle ligne au tableau
  const handleAddRow = () => {
    setData([...data, { ...newRowTemplate }]);
  };

  // Supprime une ligne du tableau
  const handleDeleteRow = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
  };

  // Duplique une ligne existante dans le tableau
  const handleDuplicateRow = (rowIndex) => {
    const rowToDuplicate = data[rowIndex];
    const newData = [...data];
    newData.splice(rowIndex + 1, 0, { ...rowToDuplicate });
    setData(newData);
  };

  // Met à jour les données lorsque les données initiales changent
  React.useEffect(() => {
    setData(initialData || []);
  }, [initialData]);

  // Gère l'exportation en CSV
  const handleExportCSV = () => {
    // Si le nom de fichier n'est pas spécifié, utilise "data.csv"
    const finalFilename = csvFilename ? `${csvFilename}.csv` : "data.csv";
    exportToCSV(data, finalFilename);

    setExportHistory((prevHistory) => [
      ...prevHistory,
      { filename: finalFilename, data: [...data], fileType: "csv" },
    ]);
  };

  // Gère l'exportation en XLSX
  const handleExportXLSX = () => {
    const finalFilename = xlsxFilename ? `${xlsxFilename}.xlsx` : "data.xlsx";
    exportToXLSX(data, finalFilename);

    setExportHistory((prevHistory) => [
      ...prevHistory,
      { filename: finalFilename, data: [...data], fileType: "xlsx" },
    ]);
  };

  // Gère le changement de nom de fichier pour les fichiers CSV
  const handleCsvFilenameChange = (e) => {
    const value = e.target.value;
    setCsvFilename(value.endsWith(".csv") ? value.slice(0, -4) : value);
  };

  // Gère le changement de nom de fichier pour les fichiers XLSX
  const handleXlsxFilenameChange = (e) => {
    const value = e.target.value;
    setXlsxFilename(value.endsWith(".xlsx") ? value.slice(0, -5) : value);
  };

  // Obtient les en-têtes du tableau en fonction des données
  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

  // Trie les données en fonction de la configuration actuelle
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

  // Gère le tri des colonnes
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Affiche un indicateur de tri
  const getSortIndicator = (header) => {
    if (sortConfig.key === header) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return null;
  };

  // Gère les modifications d'une cellule du tableau
  const handleCellChange = (rowIndex, header, value) => {
    const newData = [...data];
    newData[rowIndex][header] = value;
    setData(newData);
  };

  // Filtre les données en fonction du texte de recherche
  const filteredData = React.useMemo(() => {
    return sortedData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [sortedData, filterText]);

  // Gère le début d'un drag pour déplacer une cellule
  const handleDragStart = (rowIndex, header) => {
    setDraggingCell({ rowIndex, header });
  };

  // Gère le drop lors du déplacement d'une cellule
  const handleDrop = (targetRowIndex, targetHeader) => {
    if (draggingCell) {
      const newData = [...data];
      const sourceValue = newData[draggingCell.rowIndex][draggingCell.header];
      const targetValue = newData[targetRowIndex][targetHeader];

      newData[draggingCell.rowIndex][draggingCell.header] = targetValue;
      newData[targetRowIndex][targetHeader] = sourceValue;

      setData(newData);
      setDraggingCell(null);
    }
  };

  // Empêche le comportement par défaut lors du dragover
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Restaure les données à partir de l'historique des exportations
  const restoreDataFromHistory = (historyItem) => {
    console.log("Restoring data:", historyItem.data);
    setData(historyItem.data);
    if (historyItem.fileType === "csv") {
      setCsvFilename(historyItem.filename.replace(".csv", ""));
    } else {
      setXlsxFilename(historyItem.filename.replace(".xlsx", ""));
    }
  };

  // Affichage lorsqu'il n'y a pas de données
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

  return (
    <div className="tableContainer">
      <input
        className="inputFilter"
        type="text"
        placeholder="Filtrer..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      {/* Selon le nombre de lignes recherchées, on affiche un nombre différent de lignes */}
      {filterText && (
        <Typography variant="caption" color="primary">
          {filteredData.length} résultats trouvés
        </Typography>
      )}
      <table className="table" border="1" cellPadding="8" cellSpacing="0">
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
              </th>
            ))}
            <th className="thead">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
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
                  color="secondary"
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
            {/* Je fais une condition pour savoir si le tableau contient une ligne ou plusieurs lignes, si il n'y a qu'une ligne, je l'affiche en singulier, sinon je l'affiche en pluriel */}
            {filteredData.length === 1
              ? `Le tableau contient ${filteredData.length} ligne`
              : `Le tableau contient ${filteredData.length} lignes`}
          </div>
          <div className="exportContainer">
            <input
              className="inputExport"
              placeholder="Nomme ton fichier"
              value={csvFilename}
              type="text"
              onChange={handleCsvFilenameChange}
            />

            <span className="spanCsv">.csv</span>

            <Button onClick={handleExportCSV}>
              <Typography>Exporter en CSV</Typography>
            </Button>
          </div>
          <div className="exportContainer">
            <input
              className="inputExport"
              placeholder="Nomme ton fichier"
              value={xlsxFilename}
              type="text"
              onChange={handleXlsxFilenameChange}
            />
            {/* Je reprends la classe spanCsv pour le .xlsx, meme si il est préférable de créer une autre classe séparée */}
            <span className="spanCsv">.xlsx</span>
            <Button color="secondary" onClick={handleExportXLSX}>
              <Typography>Exporter en XLSX</Typography>
            </Button>
          </div>
          <div>
            <Typography
              variant="caption"
              color="primary"
              className="historyTitle"
            >
              Historique des téléchargements :
            </Typography>
            {/* Si les fichiers sont égaux à 0 : */}
            {exportHistory.length === 0 && (
              <Typography variant="description" color="primary">
                Aucun historique de téléchargement.
              </Typography>
            )}
            {/*  Si les fichiers sont superieurs à 0 : */}
            {exportHistory.length > 0 && (
              <Typography
                variant="description"
                color="secondary"
                className="exportHistory"
              >
                Clique sur un ficher pour le visionner.
              </Typography>
            )}
            <ul>
              {exportHistory.map((historyItem, index) => (
                <li
                  className="exportHistory"
                  key={index}
                  onClick={() => restoreDataFromHistory(historyItem)}
                  // J'ai crée une classe exportHistory pour pouvoir styliser le lien de téléchargement
                  style={{}}
                >
                  {historyItem.filename}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
