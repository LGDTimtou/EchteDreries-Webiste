import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../custom_components/InputField";
import SelectField from "../custom_components/SelectField";
import "../../../styles/custom_enchants/CustomEnchants.css";
import { versions } from "../../../data/versions";
import { enchantment_targets } from "../../../data/targets";
import { enchantment_tags } from "../../../data/tags";
import { enchantments } from "../../../data/enchantments";
import { triggers } from "../../../data/triggers";
import {
  trigger_condition_parameters,
  global_parameters,
} from "../../../data/trigger_conditions/parameters";
import AddableSelectField from "../custom_components/AddableSelectField";
import CheckboxField from "../custom_components/CheckboxField";
import TriggerSelectField from "../custom_components/builder/TriggerSelectField";
import LevelCreationField from "../custom_components/builder/LevelCreationField";
import YamlPopup from "../custom_components/builder/YamlPopup";
import { checkConstraints } from "../../../util/constraints";
import {
  defaultFormState,
  jsonToYaml,
  yamlToJson,
} from "../../../util/yamlParser";

const CustomEnchantBuilderContent = () => {
  const location = useLocation();
  const [formState, setFormState] = useState(() => {
    const storedData = localStorage.getItem("formState");
    return storedData ? JSON.parse(storedData) : defaultFormState;
  });
  const [errors, setErrors] = useState([]);
  const [copySucces, setCopySuccess] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedYaml = params.get("data");

    if (encodedYaml) {
      try {
        const decodedYaml = atob(encodedYaml);
        console.log(decodedYaml);
        const json = yamlToJson(decodedYaml);
        setFormState(json);
      } catch (error) {
        console.error("Failed to load YAML from URL:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formState", JSON.stringify(formState));
  }, [formState]);

  useEffect(() => {
    if (location.state?.json) {
      setFormState(location.state.json);
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleAddableSelectboxChange = (name, values) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  };

  const filteredParameters = () => {
    const result = formState.triggers.map((trigger) => {
      return {
        name: trigger.name,
        parameters: trigger.selected_trigger_conditions.flatMap((selected) => {
          const [trigger_condition = "", prefix = ""] =
            selected.name.split("^");
          const parameters =
            trigger_condition_parameters[trigger_condition] || [];
          return parameters.map((parameter) => ({
            ...parameter,
            name: prefix ? `${prefix}_${parameter.name}` : parameter.name,
          }));
        }),
      };
    });
    return [global_parameters, ...result];
  };

  const clearAllInput = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all inputs?"
    );
    if (confirmed) {
      setFormState(defaultFormState);
      const scrollContainer = document.querySelector(".content-container");
      if (scrollContainer)
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getYamlOutput = () => {
    const errors = checkConstraints(formState);
    setErrors(errors);
    if (errors.length > 0) return;

    navigator.clipboard.writeText(jsonToYaml(formState));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <div>
      <p className="content-intro">
        Use this builder to easily create custom enchantments
      </p>
      <div className="content-box">
        <button className="add-btn-text" onClick={() => setPopupVisible(true)}>
          Load Enchantment YAML
        </button>
        <button
          className={`add-btn-text ${copySucces ? "copy-success" : ""}`}
          onClick={getYamlOutput}
          disabled={copySucces}
        >
          {copySucces ? "Output copied to clipboard!" : "Get YAML Output"}
        </button>
        <button className="add-btn-text red" onClick={clearAllInput}>
          Clear All Input
        </button>

        {errors.length > 0 && (
          <div className="error-list">
            <h3 className="error-list-title">
              Please fix the following errors:
            </h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index} className="error-item">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <YamlPopup
        isVisible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onConfirm={(input) => setFormState(input)}
      />
      <div className="content-box">
        <h2 className="content-box-title">General Information</h2>
        <SelectField
          label="Minecraft Version"
          description="The Minecraft version you will use this enchantment on"
          options={versions.map((item) => ({ value: item, label: item }))}
          name="minecraft_version"
          value={formState.minecraft_version}
          onChange={handleChange}
        />
        <InputField
          label="Enchantment Name"
          description="The name you want the enchantment to have"
          placeholder=""
          name="enchantment_name"
          value={formState.enchantment_name}
          onChange={handleChange}
        />
      </div>
      <div className="content-box">
        <h2 className="content-box-title">Enchantment Definition</h2>
        <AddableSelectField
          name="targets"
          label="Targets"
          description="The target items for your enchantment"
          options={enchantment_targets}
          values={formState.targets}
          onChange={handleAddableSelectboxChange}
        />
        <AddableSelectField
          name="tags"
          label="Tags"
          description="Modifiers to customize your enchantment's vanilla behaviour"
          options={enchantment_tags}
          values={formState.tags}
          onChange={handleAddableSelectboxChange}
        />
        <AddableSelectField
          name="conflicts_with"
          label="Conflicts with"
          description="Enchantments that cannot be combined with your enchantment on the same item."
          options={enchantments}
          values={formState.conflicts_with}
          customOptionsAllowed={true}
          onChange={handleAddableSelectboxChange}
        />
        <InputField
          label="Anvil Cost"
          description="The amount of levels this enchanment costs to apply in an anvil"
          placeholder=""
          type="number"
          name="anvil_cost"
          value={formState.anvil_cost}
          onChange={handleChange}
        />
      </div>
      <div className="content-box">
        <h2 className="content-box-title">Enchanting Table</h2>
        <div className="field-container">
          <CheckboxField
            label="Enabled"
            description="Wether this enchant should appear in enchanting tables"
            name="in_enchanting_table"
            checked={formState.in_enchanting_table}
            onChange={handleCheckboxChange}
          />
          {formState.in_enchanting_table && (
            <InputField
              label="Weight"
              description="The likeliness of this enchantment appearing in enchanting tables [1:1024]"
              placeholder=""
              type="number"
              name="weight"
              value={formState.weight}
              onChange={handleChange}
              min={1}
              max={1024}
            />
          )}
        </div>

        {formState.in_enchanting_table && (
          <div>
            <div className="field-container">
              <InputField
                label="Minimum Cost Base"
                description="The minimum possible cost for this enchantment at level I"
                placeholder=""
                type="number"
                name="min_cost_base"
                value={formState.min_cost_base}
                onChange={handleChange}
              />
              <InputField
                label="Minimum Cost Increment"
                description="The amount of levels added to the minimum for each level above level I"
                placeholder=""
                type="number"
                name="min_cost_incr"
                value={formState.min_cost_incr}
                onChange={handleChange}
              />
            </div>

            <div className="field-container">
              <InputField
                label="Maximum Cost Base"
                description="The maximum possible cost for this enchantment at level I"
                placeholder=""
                type="number"
                name="max_cost_base"
                value={formState.max_cost_base}
                onChange={handleChange}
              />
              <InputField
                label="Maximum Cost Increment"
                description="The amount of levels added to the maximum for each level above level I"
                placeholder=""
                type="number"
                name="max_cost_incr"
                value={formState.max_cost_incr}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        <div className="content-box">
          <h2 className="content-box-title">Triggers</h2>
          <TriggerSelectField
            selectedTriggers={formState.triggers}
            triggerOptions={triggers}
            version={formState.minecraft_version}
            onChange={handleAddableSelectboxChange}
          />
        </div>

        <div className="content-box">
          <h2 className="content-box-title">Levels</h2>
          <InputField
            label="Cooldown Message"
            description="The message to be sent to the player when the enchantment is on cooldown from triggering again (leave empty if you dont want any message to be shown)"
            placeholder=""
            name="cooldown_message"
            value={formState.cooldown_message}
            onChange={handleChange}
          />
          <LevelCreationField
            levels={formState.levels}
            parametersPerTrigger={filteredParameters()}
            onChange={(value) =>
              setFormState((prevState) => ({ ...prevState, levels: value }))
            }
          />
        </div>
        <br />
        <br />
        <div className="content-box">
          <h2 className="content-box-title">Output</h2>
          <button
            className="add-btn-text"
            onClick={() => setPopupVisible(true)}
          >
            Load Enchantment YAML
          </button>
          <button
            className={`add-btn-text ${copySucces ? "copy-success" : ""}`}
            onClick={getYamlOutput}
            disabled={copySucces}
          >
            {copySucces ? "Output copied to clipboard!" : "Get YAML Output"}
          </button>
          <button className="add-btn-text red" onClick={clearAllInput}>
            Clear All Input
          </button>

          {errors.length > 0 && (
            <div className="error-list">
              <h3 className="error-list-title">
                Please fix the following errors:
              </h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={index} className="error-item">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomEnchantBuilderContent;
