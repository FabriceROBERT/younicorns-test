import React from "react";
import FileUploader from "../components/FileUploader";
import { parseCSV } from "../utils/parseFunction";
import Navbar from "../components/Navbar";
import HeroTop from "../components/HeroTop";
import Container from "../components/Container";
import Section from "../components/Section";
import CSVTable from "../components/CSVTable";

export default function HomePage() {
  const [csvData, setCsvData] = React.useState([]);

  // La fonction handleFileUpload est appelée lorsque l'utilisateur télécharge un fichier CSV.
  // Permet de récupérer les données du fichier CSV.
  const handleFileUpload = (csvText) => {
    const parsedData = parseCSV(csvText);
    setCsvData(parsedData);
  };

  return (
    <div>
      {/* La navbar est située en haut de la page mais peut etre déplacée dans App.js, tout depend de la conception ou si elle est unique */}
      <Navbar />
      <Container>
        {/* HeroTop est un composant qui contient le titre et le sous-titre de la page */}
        <HeroTop />
        <FileUploader onFileUpload={handleFileUpload} />
      </Container>
      {/* Container pour afficher les données du fichier CSV */}
      <Section>
        <Container>
          <CSVTable initialData={csvData} />
        </Container>
      </Section>
    </div>
  );
}
