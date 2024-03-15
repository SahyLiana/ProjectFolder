import React from "react";
import "./card.scss";

function Card({ title, logo, text }) {
  return (
    <div id="card">
      <h1>{logo}</h1>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default Card;
