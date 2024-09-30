import React from "react";
import "../styles/Navbar.css";
import Logo from "../assets/svg/Younicorns.svg";
import Container from "./Container";
import { Link } from "react-router-dom";
import Typography from "./Typography";

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <Container>
        <div className="navbar">
          {/* Le Container est un composant qui permet de centrer le contenu et respecte les marges */}
          <div className="logoContainer">
            <Link to="https://www.younicorns.io/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="navbarSection">
            <Link to="/">
              <Typography color="tertiary" variant="link">
                Nos offres
              </Typography>
            </Link>
            <Link to="/">
              {" "}
              <Typography color="tertiary" variant="link">
                <span style={{ textTransform: "uppercase" }}>à</span> propos{" "}
              </Typography>
            </Link>
            <Link to="/">
              <Typography variant="link" color="tertiary">
                Blog
              </Typography>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
