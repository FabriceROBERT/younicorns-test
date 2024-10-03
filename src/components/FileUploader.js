import React from "react";
import "../styles/FileUploader.css";
import toast from "react-hot-toast";
import Typography from "./Typography";

// FileUploader est un composant qui permet à l'utilisateur de télécharger un fichier CSV.
export default function FileUploader({ onFileUpload }) {
  const handleFileUpload = (event) => {
    //Va récupére le fichier CSV téléchargé
    const file = event.target.files[0];
    if (file) {
      // Vérifie si le fichier est un fichier CSV
      if (file.type === "text/csv") {
        // Lis le fichier CSV

        // Si la taille du fichier dépasse une limite (par exemple 5MB)
        const maxSize = 5;
        if (file.size > maxSize * 1024 * 1024) {
          toast.error(`Le fichier dépasse la taille maximale de ${maxSize}MB.`);
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          // Cela appel la fonction onFileUpload avec le contenu du fichier CSV
          const fileData = event.target.result;
          console.log(fileData);
          onFileUpload(fileData);
        };
        reader.onerror = () => {
          toast.error("Impossible de lire le fichier CSV");
        };
        reader.readAsText(file);
      } else {
        toast.error("Veuillez télécharger un fichier CSV valide.");
      }
    }
  };

  return (
    <div>
      <label htmlFor="mainInput" className="mainLabel">
        <Typography variant="link">Ajouter un fichier CSV</Typography>
      </label>
      <input
        id="mainInput"
        type="file"
        // Il est désactivé, afin d'afficher le popup d'erreur (toast) ligne 27.
        // accept=".csv"
        onChange={handleFileUpload}
      />
    </div>
  );
}
