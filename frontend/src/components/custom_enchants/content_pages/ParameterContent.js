import "../../../styles/custom_enchants/CustomEnchants.css";
import {
  global_parameters,
  trigger_condition_parameters,
  cooldown_message_parameters,
} from "../../../data/trigger_conditions/parameters";
import { toTitleCase } from "../../../util/util";
import TipBox from "../custom_components/builder/TipBox";

const ParameterContent = () => {
  return (
    <div>
      <p className="content-intro">
        A list of parameters that can be used in instructions, cooldown
        messages...
      </p>
      <div className="parameters-section">
        <p className="subsection-title offset">Global Parameters</p>
        {global_parameters?.map((parameter, index) => (
          <div key={index} className="parameter-item">
            <span className="parameter-name">{parameter.name}:</span>
            <span className="parameter-description">
              {parameter.description}
            </span>
          </div>
        ))}
      </div>
      <div className="parameters-section">
        <p className="subsection-title offset">Cooldown Message Parameters</p>
        {cooldown_message_parameters?.map((parameter, index) => (
          <div key={index} className="parameter-item">
            <span className="parameter-name">{parameter.name}:</span>
            <span className="parameter-description">
              {parameter.description}
            </span>
          </div>
        ))}
      </div>
      <div className="parameters-section">
        <p className="subsection-title offset">Trigger Condition Parameters</p>
        <TipBox>
          <p>These are the suffixes of the actual parameter names</p>
        </TipBox>
        {Object.keys(trigger_condition_parameters).map((section, index) => (
          <div key={`${section}-${index}`}>
            <p className="subsubsection-title offset">{toTitleCase(section)}</p>
            {trigger_condition_parameters[section].map((parameter, index) => (
              <div key={index} className="parameter-item">
                <span className="parameter-name">{parameter.name}:</span>
                <span className="parameter-description">
                  {parameter.description}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <TipBox>
        <p>
          Have an idea for a new parameter?
          <br /> Feel free to open an issue on GitHub or reach out to me on
          Discord!
        </p>
      </TipBox>
    </div>
  );
};

export default ParameterContent;
