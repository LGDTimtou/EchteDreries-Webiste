import React from "react";
import TipBox from "../custom_components/TipBox";
import { triggers } from "../../../data/triggers";
import { FaDiscord } from "react-icons/fa";
import customEnchantsLogo from "../../../assets/images/custom_enchants.png"

const HomeContent = () => {
  return (
    <div>
      <img
        src={customEnchantsLogo}
        alt="CustomEnchants Logo"
        className="home-logo"
      />

      <div>

        <div className="parameters-section">
          <p className="subsection-title offset">Why CustomEnchants?</p>
          <p className="minecraft offset">
            With this plugin, you can define <strong>fully customizable enchantments</strong> that behave exactly like vanilla — usable in <strong>enchantment tables</strong>, <strong>anvils</strong>, <strong>villager trades</strong>, <strong>mob drops</strong>, and <strong>loot chests</strong>. But it doesn’t stop there.
          </p>
          <p className="minecraft offset">
            Go beyond vanilla by defining your own logic, conditions, and effects. Whether you want to trigger effects <strong>on hit</strong>, <strong>on block break</strong>, or even <strong>when a player chats</strong> — there are <strong>{triggers.length} powerful triggers</strong> available.
          </p>
          <p className="minecraft offset">
            And the best part? You don’t need to write a single line of config. Use the intuitive <strong>visual web builder</strong> to create and manage enchantments <strong>without any hassle</strong>.
          </p>

          <TipBox>
            <ul>
              <li className="minecraft">
                Behaves exactly like vanilla enchantments
              </li>
              <li className="minecraft">
                Supports {triggers.length} powerful triggers
              </li>
              <li className="minecraft">
                Use commands, conditions, expressions... to define custom behavior.
              </li>
              <li className="minecraft">
                Create and manage enchantments using the web-based visual editor.
              </li>
            </ul>
          </TipBox>
        </div>
      </div>


      <div className="parameters-section">
        <p className="subsection-title offset">📫 Join Our Community</p>
        <p className="minecraft offset">
          Have questions? Want to share enchantment ideas or get early feature access?
        </p>

        <div className="offset">
          <a
            href="https://discord.com/invite/qYg45t33cy"
            target="_blank"
            rel="noopener noreferrer"
            className="content-button discord-button"
          >
            <FaDiscord className="discord-icon" />
            <span className="discord-label">Join the Discord Server</span>
          </a>
        </div>
      </div>


      <div className="parameters-section">
        <p className="subsection-title offset">📺 Quick Overview & Tutorial</p>
        <p className="minecraft offset">
          Watch this short video to get a quick feel for the plugin and learn how to create your first custom enchantment:
        </p>

        <div className="youtube-thumbnail-full offset">
          <a
            href="https://www.youtube.com/watch?v=WBztu62ecQo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="youtube-image-wrapper">
              <img
                src="https://img.youtube.com/vi/WBztu62ecQo/maxresdefault.jpg"
                alt="Watch CustomEnchants Overview"
                className="youtube-preview-full"
              />
              <div className="youtube-overlay-button">▶ Watch on YouTube</div>
            </div>
          </a>
        </div>
      </div>


    </div>
  );
};

export default HomeContent;
