import InputField from "../../InputField";
import SelectField from "../../SelectField";
import {instructionTypes} from "../../../../../data/instructionTypes";
import {saveContexts} from "../../../../../data/saveContexts";
import {toTitleCase} from "../../../../../util/util";

const SaveLoadInstruction = ({
                                 instruction,
                                 parentIndices,
                                 parameters,
                                 onChangeInstructionValue,
                                 onChangeInstructionType,
                             }) => {
    return (
        <div className="instruction-box-fields">
            <SelectField
                label="Type"
                description="The type of instruction you want to execute"
                options={instructionTypes}
                name="type"
                value={instruction.type}
                onChange={(e) =>
                    onChangeInstructionType([...parentIndices], e.target.value)
                }
            />
            <SelectField
                label="Context"
                description="Specify the context for loading/storing this value (e.g., 'player' for player-specific values)."
                options={saveContexts.map((item) => ({
                    name: item,
                    label: toTitleCase(item),
                }))}
                name="context"
                value={instruction.value.context}
                onChange={(e) =>
                    onChangeInstructionValue([...parentIndices], {
                        ...instruction.value,
                        context: e.target.value,
                    })
                }
            />
            <InputField
                label="Identifier"
                description="The unique identifier used to save or load this value."
                name="identifier"
                value={instruction.value.identifier}
                onChange={(e) =>
                    onChangeInstructionValue([...parentIndices], {
                        ...instruction.value,
                        identifier: e.target.value,
                    })
                }
                maxWidth={150}
                autoCompleteOptions={parameters}
            />
            <InputField
                label={instruction.type === "save" ? "Value" : "Default Value"}
                description={
                    instruction.type === "save"
                        ? "The value to be saved"
                        : "The default value this identifier will take on if there was no saved value"
                }
                name={instruction.type === "save" ? "value" : "default_value"}
                value={
                    instruction.type === "save"
                        ? instruction.value.value
                        : instruction.value.default_value
                }
                onChange={(e) =>
                    onChangeInstructionValue([...parentIndices], {
                        ...instruction.value,
                        [instruction.type === "save" ? "value" : "default_value"]:
                        e.target.value,
                    })
                }
                autoCompleteOptions={parameters}
            />
        </div>
    );
};

export default SaveLoadInstruction;
