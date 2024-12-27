import React, { useState } from "react";

const YamlPopup = ({ isVisible, onClose, onConfirm }) => {
  const [yamlContent, setYamlContent] = useState("");

  const handleConfirm = () => {
    if (yamlContent.trim()) {
      onConfirm(yamlContent);
      setYamlContent("");
      onClose();
    } else {
      alert("Please enter valid YAML content.");
    }
  };

  return (
    isVisible && (
      <div className="popup-overlay">
        <div className="popup-container">
          <h2 className="popup-title">Enter Enchantment in YAML format</h2>
          <textarea
            className="textarea-field popup-textarea"
            placeholder="Paste your enchantment here..."
            value={yamlContent}
            onChange={(e) => setYamlContent(e.target.value)}
          />
          <div className="popup-buttons">
            <button className="add-btn-text" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="add-btn-text red" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default YamlPopup;
