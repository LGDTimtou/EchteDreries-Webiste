import React from "react";

const CheckboxField = ({ label, name, checked, onChange, description }) => {
    return (
    <div style={{ marginBottom: "20px" }}>
        <label className="input-label">
            {label}
            {description && <div className="tooltip-bubble">{description}</div>}
        </label>
        <input
          className="checkbox"
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </div>
    );
  };
  
  export default CheckboxField;