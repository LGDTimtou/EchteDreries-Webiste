import React from "react";
import LevelField from "./LevelField";
import TipBox from "./TipBox";

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
        <p>You can use parameters like <code>%player%</code> to reference the player name or functions like <code>$[add(x1, x2, ...)]</code> to sum values.</p>
      </TipBox>
      <TipBox>
        <p>Start typing <strong>%</strong> or <strong>$</strong> for autocomplete suggestions.</p>
      </TipBox>
      {
        levels.map((level, index) => (
          <LevelField
            key={index}
            id={index}
            level={level}
            parameters={parameters}
            onChange={handleLevelChange}
            onRemove={handleRemoveLevel}
          />
        ))
      }

      <div className="add-trigger-section">
        <button className="add-btn-text" onClick={handleAddLevelClick}>
          + Add Level
        </button>
      </div>
    </div >
  );
});

export default LevelCreationField;
