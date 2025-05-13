import { useState, useEffect } from "react";
import AddableSelectField from "../AddableSelectField";
import { loadTrigger } from "../../../../data/trigger_conditions/loadTrigger";
import { defaultLevel } from "../../../../util/yamlParser";
import LevelCreationField from "./LevelCreationField";
import {
  global_parameters,
  trigger_condition_parameters,
} from "../../../../data/trigger_conditions/parameters";
import { global_trigger_conditions } from "../../../../data/trigger_conditions/global_trigger_conditions";
import { command_functions } from "../../../../data/commandFunctions";

const TriggerSelectField = ({
  selectedTriggers,
  triggerOptions,
  version,
  onChange,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [triggerLoading, setTriggerLoading] = useState(false);
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

  const handleTriggerLevelChange = (triggerName, newLevels) => {
    const newTriggers = selectedTriggers.map((trigger) => {
      if (trigger.name !== triggerName) return trigger;

      return {
        ...trigger,
        levels: newLevels,
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
    setTriggerLoading(true);

    if (trigger.trigger_conditions) {
      try {
        const newTrigger = await loadTrigger(trigger, version);

        const newTriggers = [...selectedTriggers, newTrigger];

        onChange("triggers", newTriggers);
      } catch (err) {
        console.error("Error loading trigger condition:", err);
      } finally {
        setTriggerLoading(false);
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
          levels: [defaultLevel],
        },
      ];
      onChange("triggers", newTriggers);
    }
  };

  const handleRemoveCondition = (triggerName, triggerConditionName) => {
    const newTriggers = selectedTriggers.map((trigger) => {
      if (trigger.name !== triggerName) return trigger;

      return {
        ...trigger,
        selected_trigger_conditions: trigger.selected_trigger_conditions.filter(
          (condition) => condition.name !== triggerConditionName
        ),
      };
    });

    onChange("triggers", newTriggers);
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

        const mappedParameters = [
          ...global_parameters,
          ...trigger.possible_trigger_conditions.flatMap((selected) => {
            let [trigger_condition = "", prefix = ""] =
              selected.name.split("^");
            const parameters =
              trigger_condition_parameters[trigger_condition] || [];

            const global_value_prefix = global_trigger_conditions.filter(
              (gl) => gl.name === trigger_condition
            )[0]?.global_value_prefix;

            if (global_value_prefix) prefix = global_value_prefix;

            return parameters.map((parameter) => ({
              ...parameter,
              name: prefix
                ? parameter.name
                  ? `${prefix}_${parameter.name}`
                  : prefix
                : parameter.name,
            }));
          }),
        ].map((parameter) => `%${parameter.name}%`);

        const mappedFunctions = command_functions.map((f) => f.autocomplete);

        return (
          <div
            key={trigger.name}
            className="trigger-card"
            style={{ paddingBottom: "20px" }}
          >
            <h3 className="content-box-title">{trigger.label}</h3>

            <button
              className="trigger-remove-btn"
              onClick={() => handleRemoveTrigger(trigger.name)}
            >
              ×
            </button>

            <p className="minecraft-gray"> - {trigger.description}</p>

            <div className="content-box">
              <h2 className="subsection-title">Trigger Conditions</h2>

              {trigger.selected_trigger_conditions.map((triggerCondition) => (
                <div
                  key={`${trigger.name}-${triggerCondition.name}`}
                  className="trigger-card"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <AddableSelectField
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
                    style={{ flexGrow: 1, marginTop: "16px" }}
                  />
                  <button
                    className="condition-remove-btn"
                    onClick={() =>
                      handleRemoveCondition(trigger.name, triggerCondition.name)
                    }
                    style={{ flexShrink: 0 }}
                  >
                    ×
                  </button>
                </div>
              ))}

              <div
                className="add-trigger-condition-section"
                style={{ position: "relative" }}
              >
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
                      style={{
                        marginBottom: "8px",
                        width: "calc(100% - 30px)",
                      }}
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

            <div className="content-box">
              <h2 className="subsection-title">Levels</h2>
              <LevelCreationField
                levels={trigger.levels}
                parameters={{ "%": mappedParameters, $: mappedFunctions }}
                onChange={(value) =>
                  handleTriggerLevelChange(trigger.name, value)
                }
              />
            </div>
          </div>
        );
      })}

      <div className="add-trigger-section">
        <button
          className="add-btn-text btn-dis"
          onClick={toggleTriggerDropdown}
          disabled={triggerLoading}
        >
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
