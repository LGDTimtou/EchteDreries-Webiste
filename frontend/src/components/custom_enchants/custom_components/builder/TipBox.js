// TipBox.js
import React from "react";

const TipBox = ({ children, type = "tip" }) => {
  return (
    <div
      className="tip-box"
      style={{
        "--tip-accent-color": type === "tip" ? "#3b82f6" : "#ef4444",
      }}
    >
      <div className="tip-icon">{type === "tip" ? "💡" : "❗"}</div>
      <div className="tip-content">
        <p className="minecraft">{children}</p>
      </div>
    </div>
  );
};

export default TipBox;
