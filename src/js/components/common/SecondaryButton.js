import React from "react";

const SecondaryButton = ({ name, onClick }) => (
  <button className="c-btn c-btn--secondary" onClick={onClick}>
    {name}
  </button>
);

export default SecondaryButton;