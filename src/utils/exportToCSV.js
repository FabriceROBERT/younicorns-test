export default function exportToCSV(data, filename) {
  const headers = Object.keys(data[0]);
  const rows = data.map((row) => Object.values(row));
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  console.log(data, filename);
  // blobb est un objet qui représente un fichier
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  // url est une chaîne de caractères qui représente l'URL du fichier
  const url = URL.createObjectURL(blob);
  // On crée un lien qui permet de télécharger le fichier
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
