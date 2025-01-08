import React from "react";
import InputField from "../InputField";
import CheckboxField from "../CheckboxField";
import SelectField from "../SelectField";
import ResizableTextArea from "../ResizableTextAreaField";


const LevelField = ({ id, level, onChange, onRemove }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const updatedLevel = {
            ...level,
            [name]: value,
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

        const updatedCommands = level.commands.map((cmd, i) =>
            i === index ? { ...cmd, [name]: value.replace(/[\r\n]+/g, " ") } : cmd
        );
        
        onChange(id, { ...level, commands: updatedCommands });
    };


    return (
    <div className="trigger-card">
        <h3 className="subsection-title">‎ Level {id + 1}</h3>
        
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
                description="The chance of the commands being executed every time the enchantment is triggered ]0:100]"
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
        <h4 className="commands-title">‎ Instructions:</h4>
            {level.commands.map((command, index) => (
                <div key={index} className={`command-card ${command.type === "command" ? "command-card-column" : ""}`}>
                    <SelectField
                        label="Instruction Type"
                        description="The type of instruction you want to execute"
                        options={[
                            { name: "command", label: "Command" },
                            { name: "delay", label: "Delay" },
                        ]}
                        name="type"
                        value={command.type}
                        onChange={(e) => handleCommandChange(index, e)}
                    />
                    {command.type === "delay" ? (
                        <InputField
                            label="Delay"
                            description="A delay in seconds before the next command is executed"
                            placeholder=""
                            type="number"
                            name="value"
                            value={command.value}
                            onChange={(e) => handleCommandChange(index, e)}
                        />
                    ) : (
                        <ResizableTextArea
                            label="Command"
                            description="The Minecraft command to be executed by the console (new lines will be replaced with spaces)"
                            name="value"
                            value={command.value}
                            onChange={(e) => handleCommandChange(index, e)}
                        />
                    )}
                    <button
                        className="remove-btn-command"
                        onClick={() => handleRemoveCommand(index)}
                    >
                        ×
                    </button>
                    
                </div>
            ))}
            <button className="add-btn-text" onClick={handleAddCommand}>
                + Add Instruction
            </button>

    </div>
  );
};

export default LevelField;