import React from "react";
import FileUploader from "../components/FileUploader";
import { parseCSV } from "../utils/parseFunction";
import Navbar from "../components/Navbar";
import HeroTop from "../components/HeroTop";
import Container from "../components/Container";
import Section from "../components/Section";
import CSVTable from "../components/CSVTable";
import Marquee from "react-fast-marquee";
import Engie from "../assets/img/engie.png";
import Loreal from "../assets/img/loreal.png";
import Sodexo from "../assets/img/sodexo.png";
import Nexity from "../assets/img/nexity.png";
import Napoleonx from "../assets/img/napoleonx.png";
import Typography from "../components/Typography";
import "../styles/HomePage.css";

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
      {/* La navbar est située en haut de la page mais peut etre déplacée dans App.js, tout depend de la conception, si elle est unique ou si les liens sont modifible. Dans mon cas à moi, c'est modifiable car elles est uniquement inclue dans HomePage  */}
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
      <div className="marqueeContainer">
        {/* J'ai préferé utiliser un marquee pour les logos des entreprises car c'est plus joli :) */}
        <Typography className="marqueeTitle" variant="title" color="primary">
          Ils nous font confiance
        </Typography>
        <Marquee>
          <img src={Engie} alt="Engie" />
          <img src={Sodexo} alt="Sodexo" />
          {/* L'image L'oreal a des bordures grises, à reformater pour mon cas */}
          <img src={Loreal} alt="Loreal" />
          <img src={Nexity} alt="Nexity" />
          <img src={Napoleonx} alt="Napoleonx" />
        </Marquee>
      </div>
    </div>
  );
}
