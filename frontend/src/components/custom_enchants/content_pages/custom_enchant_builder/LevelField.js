import React from "react";
import InputField from "../InputField";
import CheckboxField from "../CheckboxField";
import SelectField from "../SelectField";

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


    const handleAddCommand = () => {
        const updatedCommands = [
            ...level.commands,
            { type: "command", value: ""}
        ]
        onChange(id, { ...level, commands: updatedCommands});
    };

    const handleRemoveCommand = (index) => {
        const updatedCommands = level.commands.filter((_, i) => i !== index);
        onChange(id, { ...level, commands: updatedCommands });
    };

    const handleCommandChange = (index, e) => {
        const {name, value} = e.target;
        console.log(e.target);
        console.log(value);
        
        
        const updatedCommands = level.commands.map((cmd, i) =>
            i === index ? { ...cmd, [name]: value } : cmd
        );
        console.log(updatedCommands);
        
        onChange(id, { ...level, commands: updatedCommands });
    };


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
        {level.commands.map((command, index) => (
                <div key={index} className="field-container">
                    <SelectField
                        label="Instruction Type: "
                        description="The type of instruction you want to execute"
                        options={[{name: "command", label: "Command"}, {name: "delay", label: "Delay"}]}
                        name="type"
                        value={command.type}
                        onChange={(e) => handleCommandChange(index, e)}
                    
                    />
                    {command.type === "delay" ? (
                        <InputField
                            label="Delay: "
                            description="A delay in seconds before the next command is executed"
                            placeholder=""
                            type="number"
                            name="value"
                            value={command.value}
                            onChange={(e) => handleCommandChange(index, e)}
                        />
                    ) : (
                        <InputField
                            label="Command: "
                            description="The Minecraft command to be executed by the console"
                            name="value"
                            value={command.value}
                            onChange={(e) => handleCommandChange(index, e)}
                        />
                    )}
                    <button
                        className="remove-btn"
                        onClick={() => handleRemoveCommand(index)}
                    >
                        ×
                    </button>
                </div>
            ))}
            <button className="add-btn" onClick={handleAddCommand}>
                + Add Command
            </button>


    </div>
  );
};

export default LevelField;