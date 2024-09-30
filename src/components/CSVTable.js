import React from "react";
import Typography from "./Typography";
import Wait from "../assets/GIF/Magic Soou.gif";
import "../styles/CSVTable.css";

export default function CSVTable({ data }) {
  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: "ascending",
  });

  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];
  console.log(headers);

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  if (!data || data.length === 0) {
    return (
      <div className="emptyContainer">
        <div className="imageContainer">
          <img src={Wait} alt="Wait" />
        </div>
        <Typography variant="caption" color="primary">
          J'attends un fichier CSV pour commencer.
        </Typography>
      </div>
    );
  }

  return (
    <div className="tableContainer">
      <table className="table" border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                className="thead"
                key={header}
                onClick={() => handleSort(header)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map(
            (row, rowIndex) => (
              console.log(rowIndex),
              (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td className="tbody" key={colIndex}>
                      {row[header]}
                    </td>
                  ))}
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      {data.length > 0 && (
        <div> Nombre de lignes de ce tableau : {data.length} </div>
      )}
    </div>
  );
}
