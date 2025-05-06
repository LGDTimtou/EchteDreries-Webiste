import React from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import ResizableTextArea from "../ResizableTextAreaField";

const InstructionListField = ({
  parentIndices,
  instructions,
  onChangeInstructionType,
  onChangeInstructionValue,
  onRemoveInstruction,
  onAddInstruction,
}) => {
  return (
    <div>
      <h4 className="commands-title">‎ Instructions:</h4>
      {instructions.map((instruction, index) => (
        <div className={"command-card"} key={index}>
          <div className="command-header">
            <div className="command-header-left">
              <SelectField
                label="Instruction Type"
                description="The type of instruction you want to execute"
                options={[
                  { name: "command", label: "Command" },
                  { name: "delay", label: "Delay" },
                  { name: "repeat", label: "Repeat" },
                ]}
                name="type"
                value={instruction.type}
                onChange={(e) =>
                  onChangeInstructionType(
                    [...parentIndices, index],
                    e.target.value
                  )
                }
              />
              {instruction.type === "delay" ? (
                <InputField
                  label="Delay"
                  description="A delay in seconds before the next command is executed"
                  placeholder=""
                  type="number"
                  name="value"
                  value={instruction.value}
                  onChange={(e) =>
                    onChangeInstructionValue(
                      [...parentIndices, index],
                      e.target.value
                    )
                  }
                />
              ) : (
                instruction.type === "repeat" && (
                  <InputField
                    label="Amount"
                    description="The amount of times these instructions should be executed"
                    placeholder=""
                    type="number"
                    name="value"
                    value={instruction.value.amount}
                    onChange={(e) =>
                      onChangeInstructionValue([...parentIndices, index], {
                        ...instruction.value,
                        amount: e.target.value,
                      })
                    }
                  />
                )
              )}
            </div>
            <button
              className="remove-btn-command"
              onClick={() => onRemoveInstruction([...parentIndices, index])}
            >
              ×
            </button>
          </div>

          {instruction.type === "repeat" ? (
            <div className="command-card-repeat">
              <InstructionListField
                parentIndices={[...parentIndices, index]}
                instructions={instruction.value.instructions}
                onChangeInstructionType={onChangeInstructionType}
                onChangeInstructionValue={onChangeInstructionValue}
                onRemoveInstruction={onRemoveInstruction}
                onAddInstruction={onAddInstruction}
              />
            </div>
          ) : (
            instruction.type === "command" && (
              <ResizableTextArea
                label="Command"
                description="The Minecraft command to be executed by the console"
                name="value"
                value={instruction.value}
                onChange={(e) =>
                  onChangeInstructionValue(
                    [...parentIndices, index],
                    e.target.value.replace(/[\r\n]+/g, " ")
                  )
                }
              />
            )
          )}
        </div>
      ))}
      <button
        className="add-btn-text"
        onClick={() => onAddInstruction(parentIndices)}
      >
        + Add Instruction
      </button>
    </div>
  );
};

export default InstructionListField;
