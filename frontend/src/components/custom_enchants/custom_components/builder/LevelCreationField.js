import React from "react";
import LevelField from "./LevelField";
import TipBox from "../TipBox";

const LevelCreationField = React.memo(({ onChange, levels, parameters }) => {
  const handleAddLevelClick = () => {
    const lastLevel = levels[levels.length - 1];
    const newLevels = [...levels, { ...lastLevel }];
    onChange(newLevels);
  };

  const handleRemoveLevel = (idx) => {
    const newLevels = levels.filter((_, index) => index !== idx);
    onChange(newLevels);
  };

  const handleLevelChange = (idx, newLevel) => {
    const newLevels = levels.map((level, index) =>
      index === idx ? newLevel : level
    );
    onChange(newLevels);
  };

  return (
    <div>
      <TipBox>
        <p>
          You can use{" "}
          <a
            href="https://timonc.be/custom_enchants/parameters"
            className="minecraft-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            parameters
          </a>{" "}
          and{" "}
          <a
            href="https://timonc.be/custom_enchants/expressions"
            className="minecraft-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            expressions
          </a>{" "}
          in your instructions. <br />
          Start typing <strong>%</strong> for autocomplete suggestions.
        </p>
      </TipBox>
      <TipBox style={{ marginBottom: "20px" }}>
        <p>
          <a
            href="https://wiki.placeholderapi.com/users/placeholder-list/"
            className="minecraft-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            PlaceholderAPI
          </a>{" "}
          placeholders are also supported!
        </p>
      </TipBox>
      {levels.map((level, index) => (
        <LevelField
          key={index}
          id={index}
          level={level}
          parameters={parameters}
          onChange={handleLevelChange}
          onRemove={handleRemoveLevel}
        />
      ))}
      {levels.length < 256 && (
        <div className="add-trigger-section">
          <button className="add-btn-text" onClick={handleAddLevelClick}>
            + Add Level
          </button>
        </div>
      )}
    </div>
  );
});

export default LevelCreationField;
