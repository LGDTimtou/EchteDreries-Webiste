import React from "react";
import TipBox from "./TipBox";

const ExtraFunctionalityTipBox = ({firstLine}) => {
    const githubURL = "https://github.com/LGDTimtou/custom-enchants";
    const discordURL = "https://discord.gg/qYg45t33cy";

    return (
        <TipBox>
            <p>
                Have an idea for {firstLine}?
                <br/> Feel free to open an issue on{" "}
                <a
                    href={githubURL}
                    className="minecraft-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>{" "}
                or open a ticket on our{" "}
                <a
                    href={discordURL}
                    className="minecraft-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Discord server
                </a>
                !
            </p>
        </TipBox>
    );
};

export default ExtraFunctionalityTipBox;
