import React from "react";
import "../styles/Typography.css";

export default function Typography({
  variant,
  className,
  color,
  children,
  href,
}) {
  let fontClass;
  let colorClass;

  switch (variant) {
    case "title":
      fontClass = "title";
      break;
    case "link":
      fontClass = "link";
      break;
    case "button":
      fontClass = "button";
      break;
    case "description":
      fontClass = "description";
      break;
    case "caption":
      fontClass = "caption";
      break;
    default:
      fontClass = "default";
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
      colorClass = "default2";
  }

  // Si le variant est "link" et qu'un href est fourni, on retourne un élément <a>
  if (variant === "link" && href) {
    return (
      <a
        href={href}
        className={`${fontClass} ${className} ${colorClass}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  // Sinon, on retourne un div standard avec les classes spécifiées
  return (
    <div className={`${fontClass} ${className} ${colorClass}`}>{children}</div>
  );
}
