import React from "react";

const InputField = ({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  description,
  maxWidth = 400,
}) => {
  return (
    <div className="input-field-container">
      <label className="input-label">
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
        style={{ maxWidth: `${maxWidth}px` }}
      />
    </div>
  );
};

export default InputField;
