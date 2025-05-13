// TipBox.js
import React from "react";

const TipBox = ({ children }) => {
  return (
    <div className="tip-box">
      <div className="tip-icon">💡</div>
      <div className="tip-content">
        <p className="minecraft">{children}</p>
      </div>
    </div>
  );
};

export default TipBox;
