import React from "react";

const ToggleSwitchField = ({ label, name, checked, onChange, description }) => {
  return (
    <div className="toggle-container" style={{ marginBottom: "20px" }}>
      <label className="input-label">
        {label}
        {description && <div className="tooltip-bubble">{description}</div>}
      </label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="toggle-input"
        id={name}
      />
      <label className="toggle-switch" htmlFor={name}></label>
    </div>
  );
};

export default ToggleSwitchField;
