import React, { useState } from "react";
import { yamlToJson } from "../../../../util/yamlParser";

const YamlPopup = ({ isVisible, onClose, onConfirm }) => {
  const [yamlContent, setYamlContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (yamlContent.trim()) {
      setIsLoading(true);
      try {
        const parsedJson = await yamlToJson(yamlContent);
        onConfirm(parsedJson);
        setYamlContent("");
        onClose();
      } finally {
        setIsLoading(false);
      }
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
            <button 
              className="add-btn-text btn-dis" 
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Confirm"}
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
