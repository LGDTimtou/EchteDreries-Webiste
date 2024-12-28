import React from "react";
import "../../../styles/custom_enchants/CustomEnchants.css";
import { command_parameters } from "../../../data/commandParameters";

const TriggerContent = ({ category, triggerName, trigger }) => {

    const parameters = command_parameters.filter((param) => (param.triggers.includes(trigger.name)))

    return (
      <div>
        <p className="content-intro">Trigger Specifications</p>
        
        {/* Category */}
        <div className="content-box">
          <h2 className="content-box-title">{triggerName}</h2>
          <p className="minecraft">{trigger.description}</p>
        </div>
        
        <div className="parameters-section">
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
            ): <p className="minecraft">‎ No Extra Command Parameters</p>}
        </div>
      </div>
    );
  };

export default TriggerContent;