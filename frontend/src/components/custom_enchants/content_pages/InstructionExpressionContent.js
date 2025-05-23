import TipBox from "../custom_components/builder/TipBox";

const InstructionExpressionContent = () => {
  return (
    <div>
      <p className="content-intro">
        An explenation of how expressions can be used in instructions, delay values...
      </p>
      <div className="parameters-section">
        <p className="subsection-title offset">Instruction Expressions</p>
        <p className="minecraft offset">
          Expressions in instructions are defined using the syntax <code>$[expression]</code>.
          These expressions are evaluated dynamically using the <a href="https://ezylang.github.io/EvalEx/" className="minecraft-link" target="_blank" rel="noopener noreferrer">Evalex library</a>.
        </p>
        <p className="minecraft offset">
          <strong>Example:</strong>
        </p>
        <pre className="code-block offset">
          <code>tp %player% %player_x% $[%player_y% + sqrt(16)] %player_z%</code>
        </pre>
        <p className="minecraft offset">
          This command would teleport the player 4 blocks up.
        </p>
        <TipBox>
          <ul>
            <li>
              <a href="https://ezylang.github.io/EvalEx/references/functions.html" className="minecraft-link" target="_blank" rel="noopener noreferrer">
                Functions
              </a>
            </li>
            <li>
              <a href="https://ezylang.github.io/EvalEx/references/operators.html" className="minecraft-link" target="_blank" rel="noopener noreferrer">
                Operators
              </a>
            </li>
            <li>
              <a href="https://ezylang.github.io/EvalEx/references/constants.html" className="minecraft-link" target="_blank" rel="noopener noreferrer">
                Constants
              </a>
            </li>
          </ul>
        </TipBox>
      </div>
      <TipBox>
        <p>
          Have an idea for a new function, operator or constant?
          <br /> Feel free to open an issue on GitHub or reach out to me on
          Discord!
        </p>
      </TipBox>
    </div>
  );
};

export default InstructionExpressionContent;
