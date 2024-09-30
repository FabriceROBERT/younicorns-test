import React from "react";
import "../styles/Typography.css";

export default function Typography({ variant, color, children }) {
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

  return <div className={`${fontClass} ${colorClass}`}>{children}</div>;
}
