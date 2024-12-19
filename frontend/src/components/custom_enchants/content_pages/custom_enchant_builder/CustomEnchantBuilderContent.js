import React, {useState} from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import "../../../../styles/custom_enchants/CustomEnchants.css";
import { versions, enchantment_targets, enchantment_tags, enchantments, triggers } from "../../../../data";
import AddableSelectField from "../AddableSelectField";
import CheckboxField from "../CheckboxField";
import TriggerSelectField from "./TriggerSelectField";




const restrictions = {
  weight: {
    min: 1, 
    max: 1024, 
    parse: (n) => parseInt(n) 
  },
  min_cost_base: {
    min: 1, 
    max: 30, 
    parse: (n) => parseInt(n) 
  },
  min_cost_incr: {
    min: 0,
    max: 30,
    parse: (n) => parseInt(n)
  },
  max_cost_base: {
    min: 1, 
    max: 30, 
    parse: (n) => parseInt(n) 
  },
  max_cost_incr: {
    min: 0,
    max: 30,
    parse: (n) => parseInt(n)
  },
}


const CustomEnchantBuilderContent = () => {
  const [formState, setFormState] = useState({
    minecraft_version: versions[0],
    enchantment_name: "",
    anvil_cost: 2,
    in_enchanting_table: true,
    weight: 10,
    min_cost_base: 2,
    min_cost_incr: 1,
    max_cost_base: 5,
    max_cost_incr: 1,
  });

  const handleChange = (event) => {    
    const { name, value } = event.target;

    const restriction = restrictions[name];
    let parsedValue = undefined;
    if (restriction) {
      parsedValue = restriction.parse(value);
      if (parsedValue < restriction.min || parsedValue > restriction.max)
        return;
    } else {
      parsedValue = value;
    }
    
    setFormState((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const handleCheckboxChange = (event) => {
    const {name, checked} = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  }

  const handleAddableSelectboxChange = (name, values) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  }

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
            description= "The Minecraft version you will use this enchantment on"
            options={versions.map((item) => ({ value: item, label: item }))} 
            name="minecraft_version"
            value={formState.minecraft_version}
            onChange={handleChange}
          />
          <InputField 
            label="Enchantment Name: " 
            description="The name you want the enchantment to have"
            placeholder=""
            name="enchantment_name"
            value={formState.enchantment_name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="content-box">
        <h2 className="content-box-title">Enchantment Definition</h2>
        <AddableSelectField
          name = "targets"
          label = "Targets: "
          description= "The target items for your enchantment"
          options={enchantment_targets}
          onChange={handleAddableSelectboxChange}
        />
        <AddableSelectField
          name="tags"
          label = "Tags: "
          description= "Modifiers to customize your enchantment's vanilla behaviour"
          options={enchantment_tags}
          onChange={handleAddableSelectboxChange}
        />
        <AddableSelectField
          name="conflicts_with"
          label = "Conflicts with: "
          description= "Enchantments that cannot be combined with your enchantment on the same item."
          options={enchantments}
          customOptionsAllowed={true}
          onChange={handleAddableSelectboxChange}
        />
        <InputField
          label="Anvil Cost"
          description= "The amount of levels this enchanment costs to apply in an anvil"
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
          {formState.in_enchanting_table &&
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
          }
        </div>

        {formState.in_enchanting_table && 
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
        }
        <div className="content-box">
          <h2 className="content-box-title">Triggers</h2>
          <TriggerSelectField
            triggerOptions={triggers}
            version={formState.minecraft_version}
            onChange={handleAddableSelectboxChange}
          />
        </div>
        <p>{JSON.stringify(formState, null, '\t')}</p>
      </div>
    </div>
  );
};

export default CustomEnchantBuilderContent;
