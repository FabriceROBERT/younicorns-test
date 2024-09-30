export const parseCSV = (csvText) => {
  const lines = csvText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const headers = lines[0].split(";").map((header) => header.trim());
  console.log(headers);
  const data = lines.slice(1).map((line) => {
    const values = line.split(";").map((value) => value.trim());
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
  return data;
};
