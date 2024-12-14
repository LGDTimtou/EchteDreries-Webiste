import React, { useState, useEffect, useRef } from "react";
import "../../../styles/custom_enchants/CustomEnchants.css";

const AddableSelectField = ({ label, options }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleAddClick = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleOptionClick = (option) => {
    const overriddenItems = selectedItems.filter((item) =>
      option.overrides.includes(item.name)
    );

    setSelectedItems((prev) => [
      ...prev.filter((item) => !overriddenItems.includes(item)),
      option,
    ]);
    setDropdownVisible(false);
  };

  const handleRemove = (item) => {
    setSelectedItems((prev) => prev.filter((selected) => selected.name !== item.name));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setDropdownVisible(false); // Close dropdown on Escape key
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const availableOptions = options.filter(
    (option) =>
      !selectedItems.some((selected) => selected.name === option.name) &&
      !selectedItems.some((selected) => selected.overrides.includes(option.name))
  );

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <label className="input-label">
        {label}
      </label>
      <div className="addable-select-field">
        {selectedItems.map((item) => (
          <div className="tag" key={item.name}>
            {item.label}
            <button className="remove-btn" onClick={() => handleRemove(item)}>
              ×
            </button>
          </div>
        ))}
        <div className="field-actions" ref={dropdownRef}>
          {availableOptions.length > 0 && (
            <button className="add-btn" onClick={handleAddClick}>
            +
            </button>
          )}
          {dropdownVisible && (
            <div className="dropdown-options">
              {availableOptions.map((option) => (
                <div
                  key={option.name}
                  className="dropdown-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddableSelectField;


