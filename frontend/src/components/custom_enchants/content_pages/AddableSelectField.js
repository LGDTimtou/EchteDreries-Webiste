import React, { useState, useEffect, useRef } from "react";
import "../../../styles/custom_enchants/CustomEnchants.css";

const AddableSelectField = ({ options }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleAddClick = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleOptionClick = (option) => {
    if (!selectedItems.includes(option)) {
      setSelectedItems([...selectedItems, option]);
    }
    setDropdownVisible(false); // Close dropdown after selection
  };

  const handleRemove = (item) => {
    setSelectedItems(selectedItems.filter((selected) => selected !== item));
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

  return (
    <div style={{ position: "relative" }}>
      <div className="addable-select-field">
        {selectedItems.map((item, index) => (
          <div className="tag" key={index}>
            {item}
            <button className="remove-btn" onClick={() => handleRemove(item)}>
              ×
            </button>
          </div>
        ))}
        <div className="field-actions" ref={dropdownRef}>
          <button className="add-btn" onClick={handleAddClick}>
            +
          </button>
          {dropdownVisible && (
            <div className="dropdown-options">
              {options
                .filter((option) => !selectedItems.includes(option))
                .map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-option"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
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


