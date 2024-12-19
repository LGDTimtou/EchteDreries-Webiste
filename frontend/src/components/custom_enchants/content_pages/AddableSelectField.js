import React, { useState, useEffect, useRef } from "react";
import "../../../styles/custom_enchants/CustomEnchants.css";


const AddableSelectField = ({ name, label, description, options, values = [], onChange, customOptionsAllowed }) => {
  const [selectedItems, setSelectedItems] = useState(values);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customOption, setCustomOption] = useState("");
  const dropdownRef = useRef(null);
  const safeOptions = options.map(option => ({
    ...option,
    overrides: option.overrides || [],
  }));

  const handleAddClick = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleOptionClick = (option) => {
    setSelectedItems((prev) => {
      const isOverridden = prev.some((item) => item.overrides.includes(option.name));
      if (isOverridden) return prev;
  
      const newSelectedItems = [
        ...prev.filter((item) => !option.overrides.includes(item.name)),
        option,
      ];
  
      onChange(name, newSelectedItems);
      return newSelectedItems;
    });
    setDropdownVisible(false);
    setCustomOption("");
  };

  const handleBatchAdd = (options) => {
    options.forEach((option) => {
      handleOptionClick(option);
    })
  };

  const handleRemove = (item) => {
    setSelectedItems((prev) => {
      const newSelectedItems = prev.filter((selected) => selected.name !== item.name)
      
      onChange(name, newSelectedItems);
      return newSelectedItems;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setDropdownVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (!dropdownVisible) {
      setSearchQuery("");
      setCustomOption("");
    }
  }, [dropdownVisible]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const availableOptions = safeOptions.filter(
    (option) =>
      !selectedItems.some((selected) => selected.name === option.name) &&
      !selectedItems.some((selected) => selected.overrides.includes(option.name)) &&
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", position: "relative" }}>
      <label className="input-label">
        {label}
        <div className="tooltip-bubble">{description}</div>
      </label>
      <button
        className="clear-all-btn"
        onClick={() => selectedItems.forEach((item) => handleRemove(item))} // Clear all selected items
        title="Clear All"
      >
        🗑️
      </button>
      <div className="addable-select-field">
        {selectedItems.map((item) => (
          <div className="tag" key={item.name}>
            {item.label}
            { item.description && <div className="tooltip-bubble">{item.description}</div>}
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
              {(searchQuery !== "" || availableOptions.length !== 0) && (
                <div style={{ position: "relative" }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ marginBottom: "8px", width: "calc(100% - 30px)" }}
                />
                {/* Batch Add Button */}
                {availableOptions.length > 0 && searchQuery !== "" && (
                  <button
                    className="batch-add-btn-inline"
                    onClick={() => handleBatchAdd(availableOptions)}
                  >
                    ➕
                  </button>
                )}
              </div>
              )}
              {availableOptions.map((option) => (
                <div
                  key={option.name}
                  className="dropdown-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
              {availableOptions.length === 0 && searchQuery !== "" && (
                <div className="dropdown-option" style={{ color: "var(--text-secondary)" }}>
                  No option found
                </div>
              )}
              { customOptionsAllowed && (
                <div style={{ marginTop: "8px", display: "flex", gap: "5px" }}>
                <input
                  type="text"
                  className="custom-option-input"
                  placeholder="Add custom option..."
                  value={customOption}
                  onChange={(e) => setCustomOption(e.target.value)}
                  style={{ width: "calc(100% - 40px)" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleOptionClick({name: customOption.trim().replaceAll(' ', '_'), label: customOption, overrides: []});
                    }
                  }}
                />
              </div>
            )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AddableSelectField;


