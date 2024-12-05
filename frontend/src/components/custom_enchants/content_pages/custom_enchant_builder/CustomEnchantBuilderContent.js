import React, { useState } from "react";
import "../../../../styles/custom_enchants/Content.css";
import LevelsManager from "./LevelsManager";

const CustomEnchantBuilderContent = () => {
  const [enchantConfig, setEnchantConfig] = useState({
    name: "wolf_summoner",
    enabled: true,
    max_level: 1,
    enchanting_table: {
      weight: 10,
      min_cost_base: 1,
      min_cost_incr: 10,
      max_cost_base: 10,
      max_cost_incr: 10,
    },
    anvil_cost: 1,
    targets: ["weapon"],
    tags: {
      in_enchanting_table: true,
      treasure: true,
      tradeable: true,
    },
    triggers: { right_click_item: [] },
    levels: {}, // Levels managed by LevelsManager
    cooldown_message: "You have to wait %time_left% to use this enchant again!",
  });

  const handleInputChange = (key, value) => {
    setEnchantConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNestedChange = (key, subKey, value) => {
    setEnchantConfig((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [subKey]: value,
      },
    }));
  };

  const updateLevels = (newLevels) => {
    setEnchantConfig((prev) => ({
      ...prev,
      levels: newLevels,
    }));
  };

  return (
    <div className="content-page">
      <p className="content-intro">
        Use this builder to easily create custom enchantments
      </p>

      {/* General Configuration */}
      <div>
        <h2 className="content-section-title">General Configuration</h2>
        <label>
          Name:
          <input
            type="text"
            value={enchantConfig.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="input-field"
          />
        </label>
        <label>
          Enabled:
          <input
            type="checkbox"
            checked={enchantConfig.enabled}
            onChange={(e) => handleInputChange("enabled", e.target.checked)}
            className="input-field"
          />
        </label>
      </div>

      {/* Enchanting Table Configuration */}
      <div>
        <h2 className="content-section-title">Enchanting Table Configuration</h2>
        <label>
          Weight:
          <input
            type="number"
            value={enchantConfig.enchanting_table.weight}
            onChange={(e) =>
              handleNestedChange("enchanting_table", "weight", e.target.value)
            }
            className="input-field"
          />
        </label>
        <label>
          Min Cost Base:
          <input
            type="number"
            value={enchantConfig.enchanting_table.min_cost_base}
            onChange={(e) =>
              handleNestedChange(
                "enchanting_table",
                "min_cost_base",
                e.target.value
              )
            }
            className="input-field"
          />
        </label>
        <label>
          Max Cost Base:
          <input
            type="number"
            value={enchantConfig.enchanting_table.max_cost_base}
            onChange={(e) =>
              handleNestedChange(
                "enchanting_table",
                "max_cost_base",
                e.target.value
              )
            }
            className="input-field"
          />
        </label>
      </div>

      {/* Levels and Commands */}
      <LevelsManager
        levels={enchantConfig.levels}
        updateLevels={updateLevels}
      />

      {/* YAML Preview */}
      <div>
        <h2 className="content-section-title">YAML Preview</h2>
        <pre>{JSON.stringify(enchantConfig, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CustomEnchantBuilderContent;
