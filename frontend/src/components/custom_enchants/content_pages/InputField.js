import React from "react";

const InputField = ({ 
  label, 
  placeholder, 
  type = "text", 
  name, 
  value, 
  onChange, 
  description, 
  min, 
  max, 
  step = 1 
}) => {
  
  return (
    <div style={{ marginBottom: "20px" }}>
      <label 
        className="input-label"
      >
        {label}
        <div className="tooltip-bubble">{description}</div>
      </label>
      <input
        className={"input-field input-field-" + type}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        name={name}
        value={value}
        onChange={onChange}
        {...(type === "number" && { min, max, step })}
      />
    </div>
  );
};

export default InputField;