import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight, faTrash} from "@fortawesome/free-solid-svg-icons";
import "../../../../styles/custom_enchants/Content.css";
import "../../../../styles/custom_enchants/Levels.css";

const Level = ({ level, data, onDelete, onAddCommand }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`level-container ${isCollapsed ? "collapsed" : ""}`}>
      <div className="level-header">
        <div onClick={toggleCollapse} className="collapse-icon">
          <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronDown} />
        </div>
        <span className="level-title">Level {level}</span>
        <div className="delete-icon" onClick={() => onDelete(level)}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>

      {!isCollapsed && (
        <div className="level-body">
          <label>
            Cooldown (seconds):
            <input
              type="number"
              value={data.cooldown}
              onChange={(e) => data.onChangeCooldown(e.target.value)}
              className="input-field"
            />
          </label>
          <div>
            <label>
              Add Command:
              <input
                type="text"
                placeholder="Enter a command"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onAddCommand(level, e.target.value);
                    e.target.value = ""; // Clear input after adding
                  }
                }}
                className="input-field"
              />
            </label>
          </div>
          <ul className="command-list">
            {data.commands.map((cmd, index) => (
              <li key={index} className="command-item">
                {cmd}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Level;
