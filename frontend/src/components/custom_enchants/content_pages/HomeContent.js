import React from "react";
import "../../../styles/custom_enchants/Content.css";

const HomeContent = () => {
    return (
        <div className="content-page">
          <p className="content-intro">
            Explore a powerful plugin to create your own enchantments!
          </p>
          <div>
            <h2 className="content-section-title">Features</h2>
            <ul className="content-list">
              <li><strong>Built-in Custom Enchantments:</strong> Ready to use out of the box</li>
              <li><strong>Commands:</strong> Add/remove enchantments from items with ease</li>
              <li>
                <strong>Fully Customizable:</strong> Define enchantments in YAML files
                <ul className="sublist">
                  <li>Custom names, levels, and triggers</li>
                  <li>Target items and cooldowns</li>
                  <li>Custom commands with built-in parameters</li>
                  <li>Chance of execution per level</li>
                </ul>
              </li>
              <li><strong>Cancel Triggering Events:</strong> Add more control to enchantment effects</li>
            </ul>
          </div>
        </div>
      );
};

export default HomeContent;