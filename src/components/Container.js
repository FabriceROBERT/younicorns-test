import React from "react";
import "../styles/Container.css";

export default function Container({ children, className }) {
  return <div className={`container ${className}`}>{children}</div>;
}
