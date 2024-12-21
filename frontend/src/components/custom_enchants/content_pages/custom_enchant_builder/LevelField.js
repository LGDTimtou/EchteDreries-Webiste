import React from "react";
import InputField from "../InputField";
import CheckboxField from "../CheckboxField";

const restrictions = {
    cooldown: {
        min: 0,
        max: Infinity,
        parse: (n) => parseInt(n)
    },
    chance: {
        min: 0.01,
        max: 100,
        parse: (n) => parseFloat(n)
    }
}

const LevelField = ({ id, level, onChange, onRemove }) => {
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const restriction = restrictions[name]
        let parsedValue = undefined
        if (restriction && value.trim() !== "") {
            parsedValue = restriction.parse(value)
            if (parsedValue < restriction.min || parsedValue > restriction.max)
                return
        } else {
            parsedValue = value
        }


        const updatedLevel = {
            ...level,
            [name]: parsedValue,
        };
        onChange(id, updatedLevel);
    };

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        const updatedLevel = {
            ...level,
            [name]: checked,
        };
        onChange(id, updatedLevel);
      }


    return (
    <div className="trigger-card">
        <h3 className="trigger-title">Level {id + 1}</h3>
        
        {id !== 0 && (
            <button
                className="trigger-remove-btn"
                onClick={() => onRemove(id)}
            >
            ×
            </button>
        )}
        <div className="field-container">
            <InputField
                label="Cooldown"
                description="The cooldown in seconds before this enchantment can trigger again at this level [0:oo["
                placeholder=""
                type="number"
                name="cooldown"
                value={level.cooldown}
                onChange={handleInputChange}
            />
            <InputField
                label="Chance"
                description="The chance of the commands being executed each time the enchantment is triggered ]0:100]"
                placeholder=""
                type="number"
                name="chance"
                value={level.chance}
                onChange={handleInputChange}
            />
            <CheckboxField
                label="Cancel Event"
                description="Wether this enchantment level should cancel the event that triggered it"
                name="cancel_event"
                checked={level.cancel_event}
                onChange={handleCheckboxChange}
            />
        </div>
        <p className="minecraft">Commands:</p>


    </div>
  );
};

export default LevelField;