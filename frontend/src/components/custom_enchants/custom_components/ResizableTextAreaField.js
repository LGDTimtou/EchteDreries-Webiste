import React from "react";

const ResizableTextArea = ({
  label,
  placeholder,
  name,
  value = "",
  onChange,
  description,
  rows = 3,
}) => {
  return (
    <div className="textarea-container">
      <label className="input-label">
        {label}
        <div className="tooltip-bubble">{description}</div>
      </label>
      <textarea
        className="textarea-field"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => {
          // Replace newlines with spaces like before
          const cleanedValue = e.target.value.replace(/[\r\n]+/g, " ");
          onChange({ target: { name, value: cleanedValue } });
        }}
        rows={rows}
      />
    </div>
  );
};

export default ResizableTextArea;
