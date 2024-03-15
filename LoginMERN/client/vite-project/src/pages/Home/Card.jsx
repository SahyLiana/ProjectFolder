import React from "react";
import "./card.scss";
import CountUp from "react-countup";

function Card({ card, loading }) {
  return (
    <div className={`card-container ${card.title}`}>
      <h1>{card.icons}</h1>
      <div>
        <h3 style={{ color: "gainsboro", fontSize: "20px" }}>
          Total {card.title}
        </h3>
        {/* <h2>{card.numbers}</h2> */}
        {loading ? (
          <h2 style={{ fontSize: "25px", color: "white" }}>0</h2>
        ) : (
          <h2 style={{ fontSize: "25px", color: "white" }}>
            {card.title === "Earnings" && "$"}
            <CountUp duration={3} end={card.numbers} />
          </h2>
        )}
      </div>
    </div>
  );
}

export default Card;
