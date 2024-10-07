import React from "react";
import "../styles/Button.css";

// Je crée un composant Button qui permet de créer des boutons

// onclick est une fonction qui sera exécutée lorsque le bouton est cliqué
export default function Button({
  children,
  className,
  variant,
  color,
  onClick,
}) {
  let variantClasss;
  let colorClass;

  // Permet de définir la classe du bouton en fonction de son type et de sa couleur
  switch (variant) {
    case "small":
      variantClasss = "small";
      break;
    case "base":
      variantClasss = "base";
      break;
    case "large":
      variantClasss = "large";
      break;
    default:
      variantClasss = "base";
  }

  switch (color) {
    case "primary":
      colorClass = "primary";
      break;
    case "secondary":
      colorClass = "secondary";
      break;
    case "tertiary":
      colorClass = "tertiary";
      break;
    default:
      colorClass = "primary";
  }

  return (
    <>
      <button
        className={` ${className} button ${color} ${variant}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
