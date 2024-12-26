import React, { useState, useRef, useEffect } from "react";
import AddableSelectField from "../AddableSelectField";
import { prime_causes } from "../../../../data/primeCauses";
import { damage_causes } from "../../../../data/damageCauses";
import { trigger_condition_descriptions } from "../../../../data/triggerConditionDescriptions";

const triggerConditionMap = {
    block: {
        file: "blocks.json", 
        filter: (block) => block,
    },
    entity: {
        file: "entities.json",
        filter: (entity) => entity,
    },
    mob: {
        file: "entities.json",
        filter: (entity) => entity.type === "hostile" || entity.type === "mob",
    },
    animal: {
        file: "entities.json",
        filter: (entity) => entity.type === "animal",
    },
    items: {
        file: "items.json",
        filter: (item) => item,
    },
    armor: {
        file: "items.json",
        filter: (item) => item.enchantCategories?.includes("wearable") || item.enchantCategories?.includes("armor") || item.enchantCategories?.includes("equippable"),
    },
    prime_cause: {
        content: prime_causes,
    },
    damage_causes: {
        content: damage_causes,
    },
    empty: {
        content: [],
    }


}

const TriggerSelectField = ({ triggerOptions, version, onChange }) => {
  const [triggers, setTriggers] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingConditions, setLoadingConditions] = useState(null);
  const dropdownRef = useRef(null);

  const handleAddTriggerClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSelectTrigger = async (trigger) => {
    setDropdownVisible(false);
    setSearchQuery("");

    if (trigger.trigger_conditions) {
        setLoadingConditions(trigger.name);
        try {
            const triggerCondition = triggerConditionMap[trigger.trigger_conditions]
            let conditions = undefined;
            if (triggerCondition.content) {
                conditions = triggerCondition.content
            } else {
                const response = await fetch(
                    `/minecraft-data/data/pc/${version}/${triggerCondition.file}`
                );
                if (!response.ok)
                throw new Error(`Failed to fetch ${triggerCondition.file}`);
    
                const jsonData = await response.json()
                conditions = jsonData.filter(triggerCondition.filter).map((item) => ({
                    name: item.name,
                    label: item.displayName
                }));
            }
            
            setTriggers((prev) => {
                const newTriggers = [
                    ...prev,
                    {
                        name: trigger.name,
                        label: trigger.label,
                        description: trigger.description,
                        fields: [],
                        conditions,
                        condition_type: trigger.trigger_conditions
                    },
                ]

                onChange("triggers", newTriggers);
                return newTriggers;

                });
        } catch (err) {
            console.error("Error loading trigger condition:", err);
        } finally {
            setLoadingConditions(null);
        }
    } else {
        setTriggers((prev) => {
            const newTriggers = [
                ...prev,
                { name: trigger.name, label: trigger.label, description: trigger.description, fields: [], conditions: [], condition_type: null },
            ]
            onChange("triggers", newTriggers);
            return newTriggers;
        });
    }
  };

  const handleRemoveTrigger = (triggerName) => {
    setTriggers((prev) => {
        const newTriggers = prev.filter((trigger) => trigger.name !== triggerName);
        onChange("triggers", newTriggers);
        return newTriggers;
    });
  };

  const handleAddField = (triggerName, fields) => {
    setTriggers((prev) => {
        const newTriggers = prev.map((trigger) =>
            trigger.name === triggerName ? { ...trigger, fields } : trigger
        )
        onChange("triggers", newTriggers);
        return newTriggers;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setDropdownVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
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

  const filteredTriggerOptions = triggerOptions.filter((option) =>
    !triggers.some(trigger => trigger.name === option.name) &&
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {triggers.map((trigger) => (
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

            {/* Trigger Conditions or Fallback */}
            {trigger.condition_type !== null ? (
            <AddableSelectField
                name={trigger.name}
                label={"Trigger conditions"}
                description={trigger_condition_descriptions[trigger.condition_type]}
                options={trigger.conditions}
                values={trigger.fields}
                onChange={(name, fields) => handleAddField(name, fields)}
                customOptionsAllowed={true}
            />
            ) : (
            <p className="trigger-fallback">No trigger conditions available.</p>
            )}
        </div>
        ))}

      <div className="add-trigger-section" ref={dropdownRef}>
        <button className="add-btn-text" onClick={handleAddTriggerClick}>
          + Add Trigger
        </button>
        {dropdownVisible && (
          <div className="dropdown-options">
            <input
              type="text"
              className="input-field"
              placeholder="Search triggers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <div className="dropdown-option" style={{ color: "var(--text-secondary)" }}>
                No triggers found
              </div>
            )}
          </div>
        )}
      </div>
      {loadingConditions && (
        <div className="loading-message">
          Loading conditions for {loadingConditions}...
        </div>
      )}
    </div>
  );
};

export default TriggerSelectField;