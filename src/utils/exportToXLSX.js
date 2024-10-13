import * as XLSX from "xlsx";

export default function exportToXLSX(data, filename) {
  // Crée une nouvelle feuille de calcul à partir des données
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Crée un fichier binaire et génère un fichier XLSX
  const xlsxOutput = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Crée un blob pour le fichier XLSX
  const blob = new Blob([xlsxOutput], { type: "application/octet-stream" });

  // Génère une URL pour le fichier
  const url = URL.createObjectURL(blob);

  // Crée un lien pour télécharger le fichier
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
