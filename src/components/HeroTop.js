import React from "react";
import Typography from "./Typography";
import "../styles/HeroTop.css";

export default function HeroTop() {
  return (
    <div className="heroTop">
      <div className="fade-in">
        <Typography color="primary" variant="title">
          Ajoutez vos fichiers CSV. <br /> Tout simplement.
        </Typography>
      </div>
      <div className="fade-in-delay">
        <Typography color="primary" variant="description">
          Younicorns vous accompagne et réalise vos projets d'innovation ;{" "}
          <br /> de l'idéation jusqu'à la signature de vos premiers clients.
        </Typography>
      </div>
    </div>
  );
}
