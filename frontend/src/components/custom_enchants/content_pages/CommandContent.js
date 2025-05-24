import { built_in_commands } from "../../../data/builtInCommands";
import TipBox from "../custom_components/TipBox";

const CommandContent = ({ subcommand }) => {
  return (
    <div>
      <p className="content-intro">Available Commands for the Plugin</p>
      {built_in_commands.map((command, index) => (
        <div key={index} className="parameters-section">
          <p className="subsection-title offset">{command.name}</p>
          <TipBox>
            <p>{command.description}</p>
          </TipBox>
          <TipBox type="important">
            <p className="minecraft-gray">
              customenchantments.command.customenchant.{command.permission}
            </p>
          </TipBox>
        </div>
      ))}
    </div>
  );
};

export default CommandContent;
