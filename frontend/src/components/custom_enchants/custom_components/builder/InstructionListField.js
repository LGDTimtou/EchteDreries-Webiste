import React from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import ResizableTextArea from "../ResizableTextAreaField";
import { saveContexts } from "../../../../data/saveContexts";
import { toTitleCase } from "../../../../util/util";

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
                  { name: "save", label: "Save" },
                  { name: "load", label: "Load" },
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
                  description="A delay in seconds before the next command is executed (parameters and functions can be used)"
                  placeholder=""
                  name="value"
                  value={instruction.value}
                  onChange={(e) =>
                    onChangeInstructionValue(
                      [...parentIndices, index],
                      e.target.value
                    )
                  }
                />
              ) : instruction.type === "save" || instruction.type === "load" ? (
                <SelectField
                  label="Context"
                  description="Specify the context for storing this value (e.g., 'player' for player-specific values)."
                  options={saveContexts.map((item) => ({
                    name: item,
                    label: toTitleCase(item),
                  }))}
                  name="context"
                  value={instruction.value.context}
                  onChange={(e) =>
                    onChangeInstructionValue([...parentIndices, index], {
                      ...instruction.value,
                      context: e.target.value,
                    })
                  }
                />
              ) : instruction.type === "repeat" ? (
                <div className="command-header-left">
                  <InputField
                    label="Amount"
                    description="The amount of times these instructions should be executed (parameters and functions can be used)"
                    placeholder=""
                    name="value"
                    value={instruction.value.amount}
                    onChange={(e) =>
                      onChangeInstructionValue([...parentIndices, index], {
                        ...instruction.value,
                        amount: e.target.value,
                      })
                    }
                    maxWidth={40}
                  />
                  <InputField
                    label="Loop Parameter"
                    description={`Specify the name of the parameter that tracks the current loop iteration. For example, in the second iteration, %${instruction.value.loop_parameter}% will equal 2`}
                    placeholder=""
                    name="value"
                    value={instruction.value.loop_parameter}
                    onChange={(e) =>
                      onChangeInstructionValue([...parentIndices, index], {
                        ...instruction.value,
                        loop_parameter: e.target.value,
                      })
                    }
                    maxWidth={40}
                  />
                </div>
              ) : null}
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
          ) : instruction.type === "command" ? (
            <ResizableTextArea
              label="Command"
              description="The Minecraft command to be executed by the console (parameters and functions can be used)"
              name="value"
              value={instruction.value}
              onChange={(e) =>
                onChangeInstructionValue(
                  [...parentIndices, index],
                  e.target.value.replace(/[\r\n]+/g, " ")
                )
              }
            />
          ) : instruction.type === "load" || instruction.type === "save" ? (
            <div className="command-header-left">
              <InputField
                label="Identifier"
                description="The unique identifier used to save or load this value."
                placeholder=""
                name="identifier"
                value={instruction.value.identifier}
                onChange={(e) =>
                  onChangeInstructionValue([...parentIndices, index], {
                    ...instruction.value,
                    identifier: e.target.value,
                  })
                }
                maxWidth={150}
              />
              <InputField
                label={instruction.type === "save" ? "Value" : "Default Value"}
                description={
                  instruction.type === "save"
                    ? "The value to be saved"
                    : "The default value this identifier will take on if there was no saved value"
                }
                placeholder=""
                name={instruction.type === "save" ? "value" : "default_value"}
                value={
                  instruction.type === "save"
                    ? instruction.value.value
                    : instruction.value.default_value
                }
                onChange={(e) =>
                  onChangeInstructionValue(
                    [...parentIndices, index],
                    instruction.type === "save"
                      ? {
                          ...instruction.value,
                          value: e.target.value,
                        }
                      : {
                          ...instruction.value,
                          default_value: e.target.value,
                        }
                  )
                }
                maxWidth={150}
              />
            </div>
          ) : null}
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
