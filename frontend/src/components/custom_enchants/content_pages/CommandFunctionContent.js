import { command_functions } from "../../../data/commandFunctions";
import TipBox from "../custom_components/builder/TipBox";

const CommandFunctionContent = () => {
  return (
    <div>
      <p className="content-intro">
        A list of functions that can be used in instructions, delay values...
      </p>
      <div className="parameters-section">
        <p className="subsection-title offset">Instruction Functions</p>
        {command_functions?.map((commandFunction, index) => (
          <div key={index} className="parameter-item">
            <span className="parameter-name">{commandFunction.name}:</span>
            <span className="parameter-description">
              {commandFunction.description}
            </span>
          </div>
        ))}
      </div>
      <TipBox>
        <p>
          Have an idea for a new function?
          <br /> Feel free to open an issue on GitHub or reach out to me on
          Discord!
        </p>
      </TipBox>
    </div>
  );
};

export default CommandFunctionContent;
