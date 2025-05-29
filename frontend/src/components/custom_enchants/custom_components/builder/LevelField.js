import React from "react";
import InputField from "../InputField";
import ToggleSwitchField from "../ToggleSwitchField";
import InstructionListField from "./InstructionListField";
import {cooldown_message_parameters,} from "../../../../data/trigger_conditions/parameters";

const instructionsDefaultValues = {
    repeat: {
        amount: 5,
        loop_parameter: "k",
        instructions: [],
    },
    save: {
        context: "player",
        identifier: "",
        value: "",
    },
    load: {
        context: "player",
        identifier: "",
        default_value: "",
    },
    conditional: {
        condition: "",
        if: [],
        else: [],
    },
    while: {
        condition: "",
        loop_parameter: "k",
        instructions: [],
    },
};

const LevelField = React.memo(
    ({id, level, parameters, onChange, onRemove}) => {
        const handleInputChange = (e) => {
            const {name, value} = e.target;

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
        };

        const updateNestedInstruction = (instructions, path, updater) => {
            console.log(instructions);

            if (path.length === 0) return instructions;

            const [[currentIndex, targetValue], ...restPath] = Array.isArray(path[0])
                ? path
                : [[path[0], "instructions"], ...path.slice(1)];

            return instructions.map((instruction, i) => {
                if (i !== currentIndex) return instruction;

                if (restPath.length === 0) return updater(instruction);

                if (typeof instruction.value !== "object" || instruction.value == null)
                    return instruction;

                return {
                    ...instruction,
                    value: {
                        ...instruction.value,
                        [targetValue]: updateNestedInstruction(
                            instruction.value[targetValue],
                            restPath,
                            updater
                        ),
                    },
                };
            });
        };

        const handleMoveInstruction = (
            path,
            direction,
            targetKey = "instructions"
        ) => {
            let updatedInstructions;

            if (path.length === 1) {
                const index = path[0];
                const newIndex = index + direction;
                updatedInstructions = [...level.instructions];
                const [movedInstruction] = updatedInstructions.splice(index, 1);
                updatedInstructions.splice(newIndex, 0, movedInstruction);
            } else {
                const parentPath = path.slice(0, -1);
                const indexToMove = path[path.length - 1];
                const newIndex = indexToMove + direction;

                updatedInstructions = updateNestedInstruction(
                    level.instructions,
                    parentPath,
                    (cmd) => {
                        const nested = [...(cmd.value?.[targetKey] ?? [])];

                        const [movedInstruction] = nested.splice(indexToMove, 1);
                        nested.splice(newIndex, 0, movedInstruction);

                        return {
                            ...cmd,
                            value: {
                                ...cmd.value,
                                [targetKey]: nested,
                            },
                        };
                    }
                );
            }

            onChange(id, {...level, instructions: updatedInstructions});
        };

        const handleAddInstruction = (path, targetKey = "instructions") => {
            const newInstruction = {type: "command", value: ""};

            let updatedInstructions;
            if (path.length === 0) {
                updatedInstructions = [...level.instructions, newInstruction];
            } else {
                updatedInstructions = updateNestedInstruction(
                    level.instructions,
                    path,
                    (cmd) => ({
                        ...cmd,
                        value: {
                            ...cmd.value,
                            [targetKey]: [...(cmd.value?.[targetKey] ?? []), newInstruction],
                        },
                    })
                );
            }

            onChange(id, {...level, instructions: updatedInstructions});
        };

        const handleRemoveInstruction = (path, targetKey = "instructions") => {
            let updatedInstructions;

            if (path.length === 1) {
                const index = path[0];
                updatedInstructions = level.instructions.filter((_, i) => i !== index);
            } else {
                const parentPath = path.slice(0, -1);
                const indexToRemove = path[path.length - 1];

                updatedInstructions = updateNestedInstruction(
                    level.instructions,
                    parentPath,
                    (cmd) => ({
                        ...cmd,
                        value: {
                            ...cmd.value,
                            [targetKey]: (cmd.value?.[targetKey] ?? []).filter(
                                (_, i) => i !== indexToRemove
                            ),
                        },
                    })
                );
            }

            onChange(id, {...level, instructions: updatedInstructions});
        };

        const handleChangeInstructionType = (path, type) => {
            onChange(id, {
                ...level,
                instructions: updateNestedInstruction(
                    level.instructions,
                    path,
                    (cmd) => {
                        console.log("updating " + cmd);

                        return {
                            type: type,
                            value: instructionsDefaultValues[type] ?? "",
                        };
                    }
                ),
            });
        };

        const handleChangeInstructionValue = (path, value) => {
            onChange(id, {
                ...level,
                instructions: updateNestedInstruction(
                    level.instructions,
                    path,
                    (cmd) => {
                        return {
                            ...cmd,
                            value: value,
                        };
                    }
                ),
            });
        };

        return (
            <div className="trigger-card" style={{paddingBottom: "20px"}}>
                <h3 className="subsubsection-title offset"> Level {id + 1}</h3>

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
                <InputField
                    label="Cooldown Message"
                    description="Message shown to the player when the enchantment is on cooldown (leave empty to show nothing)"
                    placeholder=""
                    name="cooldown_message"
                    value={level.cooldown_message}
                    autoCompleteOptions={{
                        "%": [...cooldown_message_parameters.map(
                            (param) => `%${param.name}%`
                        ), ...parameters]
                    }}
                    onChange={handleInputChange}
                />
                <InstructionListField
                    parentIndices={[]}
                    instructions={level.instructions}
                    parameters={{"%": parameters}}
                    onChangeInstructionType={handleChangeInstructionType}
                    onChangeInstructionValue={handleChangeInstructionValue}
                    onRemoveInstruction={handleRemoveInstruction}
                    onAddInstruction={handleAddInstruction}
                    onMoveInstruction={handleMoveInstruction}
                />
            </div>
        );
    }
);

export default LevelField;
