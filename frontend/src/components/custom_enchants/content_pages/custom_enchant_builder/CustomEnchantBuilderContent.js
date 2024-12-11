import React, {useState} from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import "../../../../styles/custom_enchants/CustomEnchants.css";
import { versions, triggers } from "../../../../data";
import AddableSelectField from "../AddableSelectField";

const CustomEnchantBuilderContent = () => {
  const [formState, setFormState] = useState({
    minecraft_version: versions[0],
    enchantment_name: "",
    anvil_cost: 2,
  });

  const handleChange = (event) => {
    console.log(formState);
    
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <p className="content-intro">
        Use this builder to easily create custom enchantments
      </p>
      <div className="content-box">
        <h2 className="content-box-title">General Information</h2>
        <div className="field-container">
          <SelectField 
            label="Minecraft Version: " 
            options={versions.map((item) => ({ value: item, label: item }))} 
            name="minecraft_version"
            value={formState.minecraft_version}
            onChange={handleChange}
          />
          <InputField 
            label="Enchantment Name: " 
            placeholder=""
            name="enchantment_name"
            value={formState.enchantment_name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="content-box">
        <h2 className="content-box-title">Enchantment Definition</h2>
        <div className="field-container">
          <InputField
            label="Anvil Cost"
            placeholder=""
            type="number"
            name="anvil_cost"
            value={formState.anvil_cost}
            onChange={handleChange}
          />
          <AddableSelectField
            label = "Targets: "
            options={["kak", "drol", "teeeeeeeeeeeeeeeeeeest", "piemel", "hihihahahahhahaha", "jaaaaaaaaaaaaaaaaaa"]}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomEnchantBuilderContent;
