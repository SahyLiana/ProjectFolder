import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    { text: "FindI", handler: props.actionProvider.handleAbout, id: 5 },
    {
      text: "Phones",
      handler: props.actionProvider.handlePhones,
      id: 1,
    },
    { text: "Computers", handler: props.actionProvider.handleComputer, id: 2 },
    { text: "Others", handler: props.actionProvider.handleGadget, id: 3 },
    { text: "Delivery", handler: props.actionProvider.handleDelivery, id: 4 },

    // { text: "Product", handler: () => {}, id: 6 },
    { text: "Help", handler: props.actionProvider.handleHelp, id: 5 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
