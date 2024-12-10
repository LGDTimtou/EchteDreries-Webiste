import React from "react";

const InputField = ({ label, placeholder, type = "text", name, value, onChange}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label className="input-label">{label}</label>
      <input
        className={"input-field input-field-" + type}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;