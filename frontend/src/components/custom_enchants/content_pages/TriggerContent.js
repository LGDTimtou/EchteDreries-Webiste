import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/custom_enchants/CustomEnchants.css";
import { yamlToJson } from "../../../util/yamlParser";

const TriggerContent = ({ category, triggerName, trigger }) => {
  const navigate = useNavigate();

  const [copySucces, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  //const parameters = command_parameters.filter((param) =>
  //  param.triggers.includes(trigger.name)
  //);
  const gifUrl = `/triggerExamples/${category}/${trigger.example}.gif`;
  const yamlUrl = `/triggerExamples/${category}/${trigger.example}.yml`;

  const getYamlOutput = async () => {
    try {
      const response = await fetch(yamlUrl);
      if (!response.ok) {
        throw new Error(`Failed to load YAML file: ${yamlUrl}`);
      }
      const text = await response.text();
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error(err.message);
    }
  };

  const loadYamlOutputInBuilder = async () => {
    setLoading(true);
    try {
      const response = await fetch(yamlUrl);
      if (!response.ok) {
        throw new Error(`Failed to load YAML file: ${yamlUrl}`);
      }
      const text = await response.text();
      const json = await yamlToJson(text);
      navigate("/custom_enchants/custom_enchant_builder", { state: { json } });
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="content-intro">Trigger Specifications</p>

      {/* Category */}
      <div className="content-box">
        <h2 className="content-box-title">{triggerName}</h2>
      </div>

      <div className="parameters-section">
        <p className="subsection-title">‎ Description</p>
        <p className="minecraft">‎ {trigger.description}</p>
      </div>

      {/*<div className="parameters-section">
        {parameters.length > 0 ? (
          <div>
            <p className="subsection-title">‎ Extra Command Parameters:</p>
            <div className="parameters-list">
              {parameters.map((parameter) => (
                <div key={parameter.name} className="parameter-item">
                  <span className="parameter-name">%{parameter.name}%</span>
                  <span className="parameter-description">
                    {parameter.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="minecraft">‎ No Extra Command Parameters</p>
        )}
      </div>*/}

      {trigger.example && (
        <div className="parameters-section">
          <p className="subsection-title">‎ Example</p>
          <div>
            <img
              src={gifUrl}
              alt={`${triggerName}`}
              style={{ borderRadius: "15px", width: "100%" }}
            />
          </div>
          <button
            className={`add-btn-text ${copySucces ? "copy-success" : ""}`}
            onClick={getYamlOutput}
            disabled={copySucces}
          >
            {copySucces
              ? "Output copied to clipboard!"
              : "Copy Example Enchantment"}
          </button>
          <button
            className="add-btn-text btn-dis"
            onClick={loadYamlOutputInBuilder}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load Example in Builder"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TriggerContent;
