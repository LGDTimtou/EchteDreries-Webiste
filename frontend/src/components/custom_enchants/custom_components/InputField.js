import React, { useRef } from "react";
import AutoCompleteDropdown from "./builder/AutoCompleteDropdown";

const InputField = ({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  description,
  maxWidth = 400,
  autoCompleteOptions = {}
}) => {
  const textareaRef = useRef(null);

  const calculateDropdownPosition = (percentIndex, charWidth) => {
    if (!textareaRef.current) return;

    const input = textareaRef.current;
    const scrollLeft = input.scrollLeft;

    const left = percentIndex * charWidth - scrollLeft;

    return {
      top: input.clientHeight,
      left: left + 10,
    };
  };

  return (
    <div className="input-field-container">
      <label className="input-label">
        {label}
        <div className="tooltip-bubble">{description}</div>
      </label>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          className={"input-field input-field-" + type}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          name={name}
          value={value}
          onChange={onChange}
          ref={textareaRef}
          style={{ maxWidth: `${maxWidth}px` }}
        />
        <AutoCompleteDropdown
          options={autoCompleteOptions}
          currentText={value}
          onChange={(newValue) => onChange({ target: { name, value: newValue } })}
          calculateDropdownPosition={calculateDropdownPosition}
          textareaRef={textareaRef}
        />
      </div>

    </div>
  );
};

export default InputField;
