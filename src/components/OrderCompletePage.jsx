import React from "react";
import { useNavigate } from "react-router-dom";

export function OrderComplete() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="OrderCompleteContainer">
      Purchase Complete!
      <button onClick={() => handleClick()} className="returnToHomeButton">
        Return to home
      </button>
    </div>
  );
}
export default OrderComplete;
