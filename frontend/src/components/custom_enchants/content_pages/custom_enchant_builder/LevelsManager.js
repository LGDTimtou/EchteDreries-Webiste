import React, { useState } from "react";
import Level from "./Level";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../../styles/custom_enchants/Content.css";

const LevelsManager = () => {
  const [levels, setLevels] = useState({});

  const addLevel = () => {
    const newLevel = Object.keys(levels).length + 1;
    setLevels({
      ...levels,
      [newLevel]: { cooldown: 0, commands: [] },
    });
  };

  const deleteLevel = (level) => {
    const updatedLevels = { ...levels };
    delete updatedLevels[level];
    setLevels(updatedLevels);
  };

  const addCommandToLevel = (level, command) => {
    setLevels((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        commands: [...prev[level].commands, command],
      },
    }));
  };

  return (
    <div className="content-page">
      <h1 className="content-title">Levels and Commands</h1>
      <div className="level-manager-header">
        <h2 className="content-section-title">Levels</h2>
        <button className="add-level-button" onClick={addLevel}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="levels-list">
        {Object.entries(levels).map(([level, data]) => (
          <Level
            key={level}
            level={level}
            data={{
              ...data,
              onChangeCooldown: (newCooldown) => {
                setLevels((prev) => ({
                  ...prev,
                  [level]: { ...prev[level], cooldown: newCooldown },
                }));
              },
            }}
            onDelete={deleteLevel}
            onAddCommand={addCommandToLevel}
          />
        ))}
      </div>
    </div>
  );
};

export default LevelsManager;