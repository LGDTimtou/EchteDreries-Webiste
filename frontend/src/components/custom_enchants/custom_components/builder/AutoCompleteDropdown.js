// AutocompleteDropdown.js
import React, { useState, useEffect, useRef, useCallback } from "react";

const AutoCompleteDropdown = ({
  options,
  calculateDropdownPosition,
  textareaRef,
  onChange
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [charWidth, setCharWidth] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const fontStyle = window.getComputedStyle(textareaRef.current).font;
      context.font = fontStyle;

      const width = context.measureText(" ").width;

      setCharWidth(width);
    }
  }, [textareaRef]);

  useEffect(() => {
    for (const key of Object.keys(options)) {
      if (autocompleteValue.startsWith(key)) {

        const filtered = options[key].filter((param) =>
          param.toLowerCase().includes(autocompleteValue.substring(1).toLowerCase())
        );
        setFilteredOptions(filtered);
        setShowAutocomplete(filtered.length > 0);
        setSelectedIndex(0);
      } else {
        setShowAutocomplete(false);
      }
    }
  }, [autocompleteValue, options]);

  useEffect(() => {
    if (filteredOptions.length > 0) {
      setFilteredOptions(filteredOptions);
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  }, [filteredOptions]);

  const handleAutocompleteSelect = useCallback((option) => {
    if (!textareaRef.current) return;
    const cursorPos = textareaRef.current.selectionStart;
    const textBeforeCursor = textareaRef.current.value.slice(0, cursorPos);
    const textAfterCursor = textareaRef.current.value.slice(cursorPos);

    const lastPercentIndex = textBeforeCursor.lastIndexOf(option[0]);
    const newText =
      textBeforeCursor.slice(0, lastPercentIndex) + option + textAfterCursor;

    // Move cursor to end of option
    const newCursorPos = lastPercentIndex + option.length;
    setTimeout(() => {
      textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      textareaRef.current.focus();
    }, 0);

    onChange(newText);

    setShowAutocomplete(false);
    setAutocompleteValue("");
  }, [textareaRef, onChange]);

  const handleTextChange = useCallback((e) => {
    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = e.target.value.slice(0, cursorPos);

    for (const key of Object.keys(options)) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const newParameterRegex = new RegExp(`${escapedKey}[a-z_]*$`, "i");
      const completeParameterRegex = new RegExp(`${escapedKey}[a-z_]+${escapedKey}[a-z_]*$`, "i");

      const newParameterMatch = textBeforeCursor.match(newParameterRegex);
      const completeMatch = textBeforeCursor.match(completeParameterRegex);

      if (newParameterMatch && !completeMatch) {
        const parameterText = newParameterMatch[0];
        setAutocompleteValue(parameterText);
        const position = calculateDropdownPosition(
          textBeforeCursor.length - parameterText.length,
          charWidth
        );
        setPosition(position);
        return;
      }
    }
    setAutocompleteValue("");
    setShowAutocomplete(false);

  }, [calculateDropdownPosition, charWidth, options]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!showAutocomplete) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setShowAutocomplete(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prevIndex) => {
          const newIndex = prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0;
          setTimeout(() => {
            document
              .querySelector(`.autocomplete-option[data-index="${newIndex}"]`)
              ?.scrollIntoView({
                block: "nearest",
                behavior: "smooth"
              });
          }, 0);
          return newIndex;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prevIndex) => {
          const newIndex = prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1;
          setTimeout(() => {
            document
              .querySelector(`.autocomplete-option[data-index="${newIndex}"]`)
              ?.scrollIntoView({
                block: "nearest",
                behavior: "smooth"
              });
          }, 0);
          return newIndex;
        });
      } else if ((e.key === "Enter" || e.key === "Tab") && showAutocomplete) {
        e.preventDefault();
        if (filteredOptions[selectedIndex]) {
          handleAutocompleteSelect(filteredOptions[selectedIndex]);
        }
      }
    },
    [showAutocomplete, filteredOptions, selectedIndex, handleAutocompleteSelect]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.addEventListener("keydown", handleKeyDown);
    textarea.addEventListener("input", handleTextChange);

    return () => {
      textarea.removeEventListener("keydown", handleKeyDown);
      textarea.removeEventListener("input", handleTextChange);
    };
  }, [textareaRef, handleKeyDown, handleTextChange]);


  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {showAutocomplete && (
        <div
          className="autocomplete-dropdown"
          style={{
            position: "absolute",
            top: position.top + "px",
            left: position.left + "px"
          }}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className={`autocomplete-option ${index === selectedIndex ? "selected" : ""
                }`}
              data-index={index}
              onMouseDown={() => handleAutocompleteSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteDropdown;
