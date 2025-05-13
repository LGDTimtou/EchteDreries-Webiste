// TipBox.js
import React from "react";

const TipBox = ({ children }) => {
    return (
        <div className="tip-box">
            <div className="tip-icon">💡</div>
            <p className="minecraft">{children}</p>
        </div>
    );
};

export default TipBox;
