import React, { useState, useEffect } from "react";
import AddableSelectField from "../AddableSelectField";
import { loadTrigger } from "../../../../data/trigger_conditions/loadTrigger";

const TriggerSelectField = ({
  selectedTriggers,
  triggerOptions,
  version,
  onChange,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [triggerSearchQuery, setTriggerSearchQuery] = useState("");
  const [triggerConditionSearchQuery, setTriggerConditionSearchQuery] =
    useState("");

  const toggleTriggerDropdown = () => {
    setOpenDropdown((prev) => (prev === "trigger" ? null : "trigger"));
  };

  const toggleConditionDropdown = (triggerName) => {
    const key = `conditions:${triggerName}`;
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleAddTriggerConditionFields = (
    triggerName,
    conditionName,
    newFields
  ) => {
    const newTriggers = selectedTriggers.map((trigger) => {
      if (trigger.name !== triggerName) return trigger;

      const updatedSelectedConditions = trigger.selected_trigger_conditions.map(
        (condition) => {
          if (condition.name !== conditionName) return condition;
          return {
            ...condition,
            fields: newFields,
          };
        }
      );

      return {
        ...trigger,
        selected_trigger_conditions: updatedSelectedConditions,
      };
    });

    onChange("triggers", newTriggers);
  };

  const handleSelectTriggerCondition = (triggerName, triggerConditionToAdd) => {
    const newTriggers = selectedTriggers.map((trigger) => {
      if (trigger.name !== triggerName) return trigger;

      return {
        ...trigger,
        selected_trigger_conditions: [
          ...trigger.selected_trigger_conditions,
          triggerConditionToAdd,
        ],
      };
    });

    onChange("triggers", newTriggers);
    setOpenDropdown(null);
  };

  const handleSelectTrigger = async (trigger) => {
    setOpenDropdown(null);
    setTriggerSearchQuery("");

    if (trigger.trigger_conditions) {
      try {
        const newTrigger = await loadTrigger(trigger, version);

        const newTriggers = [...selectedTriggers, newTrigger];

        onChange("triggers", newTriggers);
      } catch (err) {
        console.error("Error loading trigger condition:", err);
      }
    } else {
      const newTriggers = [
        ...selectedTriggers,
        {
          name: trigger.name,
          label: trigger.label,
          description: trigger.description,
          possible_trigger_conditions: [],
          selected_trigger_conditions: [],
        },
      ];
      onChange("triggers", newTriggers);
    }
  };

  const handleRemoveTrigger = (triggerName) => {
    const newTriggers = selectedTriggers.filter(
      (trigger) => trigger.name !== triggerName
    );
    onChange("triggers", newTriggers);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpenDropdown(null);
    }
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".dropdown-options") &&
      !event.target.closest(".add-btn-text")
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredTriggerOptions = triggerOptions.filter(
    (option) =>
      !selectedTriggers.some((trigger) => trigger.name === option.name) &&
      option.label.toLowerCase().includes(triggerSearchQuery.toLowerCase())
  );

  return (
    <div>
      {selectedTriggers.map((trigger) => {
        const filteredConditionOptions =
          trigger.possible_trigger_conditions.filter(
            (option) =>
              !trigger.selected_trigger_conditions.some(
                (selected) => selected.name === option.name
              ) &&
              option.label
                .toLowerCase()
                .includes(triggerConditionSearchQuery.toLowerCase())
          );

        return (
          <div key={trigger.name} className="trigger-card">
            {/* Trigger Title */}
            <h3 className="subsection-title">{trigger.label}</h3>

            {/* Remove Button */}
            <button
              className="trigger-remove-btn"
              onClick={() => handleRemoveTrigger(trigger.name)}
            >
              ×
            </button>

            <p className="minecraft-gray"> - {trigger.description}</p>

            {trigger.selected_trigger_conditions.map((triggerCondition) => (
              <AddableSelectField
                key={triggerCondition.name}
                name={triggerCondition.name}
                label={triggerCondition.label}
                description={triggerCondition.description}
                options={triggerCondition.possible_values}
                values={triggerCondition.fields}
                onChange={(triggerConditionName, fields) =>
                  handleAddTriggerConditionFields(
                    trigger.name,
                    triggerConditionName,
                    fields
                  )
                }
                customOptionsAllowed={true}
              />
            ))}

            <div className="add-trigger-condition-section">
              {filteredConditionOptions.length !== 0 && (
                <button
                  className="add-btn-text"
                  onClick={() => toggleConditionDropdown(trigger.name)}
                >
                  + Add Trigger Condition
                </button>
              )}
              {openDropdown === `conditions:${trigger.name}` && (
                <div className="dropdown-options">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Search trigger conditions..."
                    value={triggerConditionSearchQuery}
                    onChange={(e) =>
                      setTriggerConditionSearchQuery(e.target.value)
                    }
                    style={{ marginBottom: "8px", width: "calc(100% - 30px)" }}
                  />
                  {filteredConditionOptions.map((option) => (
                    <div
                      key={option.name}
                      className="dropdown-option"
                      onClick={() =>
                        handleSelectTriggerCondition(trigger.name, option)
                      }
                    >
                      {option.label}
                    </div>
                  ))}
                  {filteredConditionOptions.length === 0 && (
                    <div
                      className="dropdown-option"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      No trigger conditions found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="add-trigger-section">
        <button className="add-btn-text" onClick={toggleTriggerDropdown}>
          + Add Trigger
        </button>
        {openDropdown === "trigger" && (
          <div className="dropdown-options">
            <input
              type="text"
              className="input-field"
              placeholder="Search triggers..."
              value={triggerSearchQuery}
              onChange={(e) => setTriggerSearchQuery(e.target.value)}
              style={{ marginBottom: "8px", width: "calc(100% - 30px)" }}
            />
            {filteredTriggerOptions.map((option) => (
              <div
                key={option.name}
                className="dropdown-option"
                onClick={() => handleSelectTrigger(option)}
              >
                {option.label}
              </div>
            ))}
            {filteredTriggerOptions.length === 0 && (
              <div
                className="dropdown-option"
                style={{ color: "var(--text-secondary)" }}
              >
                No triggers found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TriggerSelectField;
