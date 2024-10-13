import React from "react";
import "../styles/Footer.css";
import Logo from "../assets/svg/Younicorns.svg";
import Facebook from "../assets/svg/facebook.svg";
import Instagram from "../assets/svg/instagram.svg";
import Twitter from "../assets/svg/twitter.svg";
import WhatsApp from "../assets/svg/whatsapp.svg"; // Correction de l'orthographe
import Typography from "../components/Typography";

export default function Footer() {
  // Récupération de l'année actuelle pour l'affichage du copyright
  const year = new Date().getFullYear();

  // Définition des liens du footer sous forme de tableau afin de faciliter la gestion
  const links = [
    {
      title: "MENU",
      links: [
        { title: "Accueil", link: "/" },
        { title: "Discover", link: "/discover" },
        { title: "À propos", link: "/about" },
        { title: "Blog", link: "/blog" },
        { title: "Nous contacter", link: "/contact" },
      ],
    },
    {
      title: "OFFRES",
      links: [
        { title: "Discover", link: "/shape" },
        { title: "Shape", link: "/shape" },
        { title: "Build", link: "/shape" },
        { title: "Grow", link: "/shape" },
        { title: "Evolve", link: "/shape" },
        { title: "Adopt", link: "/shape" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { title: "Mentions légales", link: "/mentions-legales" },
        {
          title: "Politique de confidentialité",
          link: "/politique-de-confidentialite",
        },
        {
          title: "Conditions générales d'utilisation",
          link: "/conditions-generales-d-utilisation",
        },
      ],
    },
  ];

  // Composant pour afficher les liens du footer
  const Links = () => (
    <div className="linkContainer">
      <div className="links">
        {links.map((category, index) => (
          <div key={index}>
            {/* Affichage du titre de la catégorie */}
            <Typography className="header" variant="link">
              {category.title}
            </Typography>
            {category.links.map((item, idx) => (
              <Typography className="row" key={idx} variant="link">
                {/* Utilisation de Typography pour les liens, le href est passé à l'intérieur */}
                <a href={item.link} className="link">
                  {item.title}
                </a>
              </Typography>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    // je coupe le footer en 3 parties pour le rendre plus lisible, 2 colonnes 40%, 60% (voir Footer.css) et une colonne du bas où je fais un space bettween pour que les éléments soient plus éloignés

    <footer className="footer">
      <div className="footerContent">
        <div className="part1">
          <div className="logoContainer">
            <img src={Logo} alt="Younicorns Logo" />
          </div>
          <div>
            {/* Slogan du footer */}
            {/* Mettre justte en dessous du logo */}
            <Typography variant="description">
              Do. Or do not. There is no try.
            </Typography>
            <Typography className="adresse" variant="caption">
              155 rue Anatole France, <br /> 92300 Levallois-Perret
            </Typography>
          </div>
        </div>
        <div className="part2">
          <Links />
        </div>
      </div>
      <div className="footerBottom">
        {/* Affichage des droits d'auteur */}
        <div>@Copyright Younicorns {year}. All rights reserved</div>
        <div className="socialMedia">
          {/* Liens vers les réseaux sociaux */}
          <a
            href="https://facebook.com"
            target="_blank"
            //  rel="noopener noreferrer" indique que le lien est une fenêtre ou un onglet de navigateur externe, et que le navigateur doit ouvrir le lien dans un nouvel onglet ou une nouvelle fenêtre.
            rel="noopener noreferrer"
          >
            <img src={Facebook} alt="Facebook" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Instagram} alt="Instagram" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Twitter} alt="Twitter" />
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={WhatsApp} alt="WhatsApp" />
          </a>
        </div>
      </div>
    </footer>
  );
}
