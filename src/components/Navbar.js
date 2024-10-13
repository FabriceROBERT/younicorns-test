import React from "react";
import "../styles/Navbar.css";
import Logo from "../assets/svg/Younicorns.svg";
import HamburgerMenu from "../assets/img/hamburger-menu.png";
import Container from "./Container";
import { Link } from "react-router-dom";
import Typography from "./Typography";
import Button from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const Navlinks = () => (
    <>
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
    </>
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbarContainer">
      <Container className="container">
        <div className="navbar">
          {/* Le Container est un composant qui permet de centrer le contenu et respecte les marges */}
          <div className="logoContainer">
            <Link to="https://www.younicorns.io/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div onClick={toggleMenu} className="burgerButton">
            <img
              className="hamburgerMenu"
              src={HamburgerMenu}
              alt="HamburgerMenu"
            />
          </div>

          <div className={`navbarSection2 ${isOpen ? "show" : ""}`}>
            <Navlinks />
          </div>

          <div className="navbarSection">
            <Navlinks className="navbarSection" />
          </div>
        </div>
      </Container>
    </div>
  );
}
