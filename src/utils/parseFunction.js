export const parseCSV = (csvText) => {
  // Supprime les espaces en début et fin de ligne
  const lines = csvText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  // Récupère les en-têtes des colonnes
  const headers = lines[0].split(";").map((header) => header.trim());
  console.log(headers);
  // Récupère les données
  const data = lines.slice(1).map((line) => {
    const values = line.split(";").map((value) => value.trim());
    const obj = {};
    // Assigne les valeurs aux en-têtes correspondants
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
  return data;
};
