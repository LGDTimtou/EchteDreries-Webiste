// TipBox.js
import React from "react";

const TipBox = ({ children, type = "tip", style }) => {
  return (
    <div
      className="tip-box"
      style={{
        ...style,
        "--tip-accent-color": type === "tip" ? "#3b82f6" : "#ef4444",
      }}
    >
      <div className="tip-icon">{type === "tip" ? "💡" : "❗"}</div>
      <div className="tip-content">
        <div className="minecraft">{children}</div>
      </div>
    </div>
  );
};

export default TipBox;
