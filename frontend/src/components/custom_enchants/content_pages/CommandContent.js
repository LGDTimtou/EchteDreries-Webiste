import { built_in_commands } from "../../../data/builtInCommands";
import TipBox from "../custom_components/builder/TipBox";

const CommandContent = ({ subcommand }) => {
  return (
    <div>
      <p className="content-intro">Available Commands for the Plugin</p>
      {built_in_commands.map((command, index) => (
        <div className="parameters-section">
          <p className="subsection-title offset">{command.name}</p>
          <TipBox>
            <p className="minecraft">{command.description}</p>
          </TipBox>
          <TipBox type="important">
            <p className="minecraft-gray">
              customenchantments.command.{command.permission}
            </p>
          </TipBox>
        </div>
      ))}
    </div>
  );
};

export default CommandContent;
