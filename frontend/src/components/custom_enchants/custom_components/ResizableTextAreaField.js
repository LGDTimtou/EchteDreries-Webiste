import React, { useState, useEffect } from "react";

const ResizableTextArea = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  description,
  rows = 3, // Default number of rows
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce logic: Delay calling `onChange` until user stops typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({ target: { name, value: localValue } });
    }, 10);

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [localValue, onChange, name]);

  const handleInputChange = (e) => {
    setLocalValue(e.target.value);
  };

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
        value={localValue}
        onChange={handleInputChange}
        rows={rows}
      />
    </div>
  );
};

export default ResizableTextArea;
