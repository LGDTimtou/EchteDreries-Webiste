import { useRef } from "react";
import AutoCompleteDropdown from "./builder/AutoCompleteDropdown";

const ResizableTextArea = ({
  label,
  placeholder,
  name,
  value = "",
  onChange,
  description,
  rows = 3,
  autoCompleteOptions = []
}) => {
  const textareaRef = useRef(null);

  const calculateDropdownPosition = (percentIndex, charWidth) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const text = textarea.value.substring(0, percentIndex);
    const fontSize = parseFloat(window.getComputedStyle(textarea).fontSize);
    const lineHeight = fontSize * 1.2;

    const textareaWidth = textarea.clientWidth;
    const computedStyle = window.getComputedStyle(textarea);

    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;

    // Adjusted width
    const adjustedWidth = textareaWidth - paddingLeft - paddingRight;
    const maxCharsPerLine = Math.floor(adjustedWidth / charWidth);

    let lines = [];
    let currentLine = "";

    for (let word of text.split(" ")) {
      // If the word alone exceeds the max line length
      if (word.length >= maxCharsPerLine) {
        // If current line has text, push it first
        if (currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = "";
        }

        // Break the word across multiple lines
        while (word.length > 0) {
          if (word.length > maxCharsPerLine) {
            lines.push(word.slice(0, maxCharsPerLine));
            word = word.slice(maxCharsPerLine);
          } else {
            currentLine = word;
            word = "";
          }
        }
      } else {
        // Check if the word fits in the current line
        if (
          currentLine.length + word.length + (currentLine ? 1 : 0) >
          maxCharsPerLine
        ) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine += (currentLine ? " " : "") + word;
        }
      }
    }

    // Add the last line
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    const lastLine = lines[lines.length - 1] || "";
    const left = Math.min(lastLine.length * charWidth);

    const top = lineHeight * (lines.length - (lines.length === 0 ? 0 : 1));

    return {
      top: top + 60,
      left: left + 5,
    };
  };

  const onChangeText = (cleanedValue) => {
    onChange({ target: { name, value: cleanedValue } });
  };

  return (
    <div className="textarea-container" style={{ position: "relative" }}>
      <label className="input-label">
        {label}
        <div className="tooltip-bubble">{description}</div>
      </label>
      <textarea
        className="textarea-field"
        placeholder={placeholder}
        name={name}
        value={value}
        ref={textareaRef}
        rows={rows}
      />
      <AutoCompleteDropdown
        options={autoCompleteOptions}
        currentText={value}
        onChange={onChangeText}
        calculateDropdownPosition={calculateDropdownPosition}
        textareaRef={textareaRef}
      />
    </div>
  );
};

export default ResizableTextArea;
