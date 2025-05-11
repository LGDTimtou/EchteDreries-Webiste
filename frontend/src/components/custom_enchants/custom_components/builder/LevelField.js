import React from "react";
import InputField from "../InputField";
import ToggleSwitchField from "../ToggleSwitchField";
import InstructionListField from "./InstructionListField";

const LevelField = React.memo(({ id, level, onChange, onRemove }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedLevel = {
      ...level,
      [name]: value,
    };
    onChange(id, updatedLevel);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedLevel = {
      ...level,
      [name]: checked,
    };
    onChange(id, updatedLevel);
  };

  const updateNestedInstruction = (commands, path, updater) => {
    if (path.length === 0) return commands;

    const [currentIndex, ...restPath] = path;

    return commands.map((cmd, i) => {
      if (i !== currentIndex) return cmd;

      if (restPath.length === 0) return updater(cmd);

      if (cmd.type === "repeat" && cmd.value?.instructions) {
        return {
          ...cmd,
          value: {
            ...cmd.value,
            instructions: updateNestedInstruction(
              cmd.value.instructions,
              restPath,
              updater
            ),
          },
        };
      }

      console.error("error in nested instructions updating");
      return cmd;
    });
  };

  const handleAddInstruction = (path) => {
    let updatedCommands;
    const newInstruction = { type: "command", value: "" };
    if (path.length === 0) {
      updatedCommands = [...level.commands, newInstruction];
    } else {
      updatedCommands = updateNestedInstruction(
        level.commands,
        path,
        (cmd) => ({
          ...cmd,
          value: {
            ...cmd.value,
            instructions: [...cmd.value.instructions, newInstruction],
          },
        })
      );
    }

    onChange(id, { ...level, commands: updatedCommands });
  };

  const handleRemoveInstruction = (path) => {
    let updatedCommands;
    if (path.length === 1) {
      const index = path[0];
      updatedCommands = level.commands.filter((_, i) => i !== index);
    } else {
      const parentPath = path.slice(0, -1);
      const indexToRemove = path[path.length - 1];

      updatedCommands = updateNestedInstruction(
        level.commands,
        parentPath,
        (cmd) => ({
          ...cmd,
          value: {
            ...cmd.value,
            instructions: cmd.value.instructions.filter(
              (_, i) => i !== indexToRemove
            ),
          },
        })
      );
    }
    onChange(id, { ...level, commands: updatedCommands });
  };

  const handleChangeInstructionType = (path, type) => {
    onChange(id, {
      ...level,
      commands: updateNestedInstruction(level.commands, path, (cmd) => {
        return type === "repeat"
          ? {
              type: type,
              value: {
                amount: 5,
                instructions: [],
              },
            }
          : { type: type, value: "" };
      }),
    });
  };

  const handleChangeInstructionValue = (path, value) => {
    onChange(id, {
      ...level,
      commands: updateNestedInstruction(level.commands, path, (cmd) => {
        return {
          ...cmd,
          value: value,
        };
      }),
    });
  };

  return (
    <div className="trigger-card">
      <h3 className="subsection-title">‎ Level {id + 1}</h3>

      {id !== 0 && (
        <button className="trigger-remove-btn" onClick={() => onRemove(id)}>
          ×
        </button>
      )}
      <div className="field-container">
        <InputField
          label="Cooldown"
          description="Cooldown time in seconds before the enchantment can trigger again at this level"
          placeholder=""
          type="number"
          name="cooldown"
          value={level.cooldown}
          onChange={handleInputChange}
        />
        <InputField
          label="Chance"
          description="The chance (in %) that the commands will be executed when the enchantment is triggered"
          placeholder=""
          type="number"
          name="chance"
          value={level.chance}
          onChange={handleInputChange}
        />
        <ToggleSwitchField
          label="Cancel Event"
          description="If enabled, this level of the enchantment will cancel the triggering event"
          name="cancel_event"
          checked={level.cancel_event}
          onChange={handleCheckboxChange}
        />
      </div>
      <InstructionListField
        parentIndices={[]}
        instructions={level.commands}
        onChangeInstructionType={handleChangeInstructionType}
        onChangeInstructionValue={handleChangeInstructionValue}
        onRemoveInstruction={handleRemoveInstruction}
        onAddInstruction={handleAddInstruction}
      />
    </div>
  );
});

export default LevelField;
