import React from "react";
import LevelField from "./LevelField";
import { command_functions } from "../../../../data/commandFunctions";

const LevelCreationField = ({ onChange, levels, parameters }) => {

  const handleAddLevelClick = () => {
    const lastLevel = levels[levels.length - 1];
    const newLevels = [...levels, { ...lastLevel }];
    onChange(newLevels);
  };


  const handleRemoveLevel = (idx) => {
    const newLevels = levels.filter((_, index) => index !== idx)
    onChange(newLevels);
  };

  const handleLevelChange = (idx, newLevel) => {
    const newLevels = levels.map((level, index) => (index === idx ? newLevel : level))
    onChange(newLevels);
}

  return (
    <div>
        <div className="parameters-section">
            <p className="subsection-title">‎ Usable Command Parameters:</p>
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
        <div className="parameters-section">
            <p className="subsection-title">‎ Usable Command Functions:</p>
            <div className="parameters-list">
            {command_functions.map((command_function) => (
                <div key={command_function.name} className="parameter-item">
                <span className="parameter-name">{command_function.name}</span>
                <span className="parameter-description">
                    {command_function.description}
                </span>
                </div>
            ))}
            </div>
        </div>


        {levels.map((level, index) => (
        <LevelField
            key={index}
            id={index}
            level={level}
            onChange={handleLevelChange}
            onRemove={handleRemoveLevel}
        />
        ))}

        <div className="add-trigger-section">
            <button className="add-btn-text" onClick={handleAddLevelClick}>
            + Add Level
            </button>
        </div>
    </div>
  );
};

export default LevelCreationField;