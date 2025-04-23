import { times } from "./values/time";
import { dimensions } from "./values/dimensions";
import { prime_causes } from "./values/causes/primeCauses";
import { ignite_causes } from "./values/causes/igniteCauses";
import { damage_causes } from "./values/causes/damageCauses";
import { global_trigger_conditions } from "./global_trigger_conditions";
import { inventory_types } from "./values/inventory_type";

export const loadTrigger = async (trigger, version) => {
  const triggerConditionTypes = [...(trigger.trigger_conditions ?? [])];
  triggerConditionTypes.push(...global_trigger_conditions);

  const triggerConditions = [];
  for (const triggerConditionType of triggerConditionTypes) {
    const triggerCondition =
      triggerConditionMap[triggerConditionType.value_type];

    let possibleValues;
    if (triggerCondition.content) {
      possibleValues = triggerCondition.content;
    } else {
      const path = `/minecraft_data/${version}/${triggerCondition.file}`;
      const response = await fetch(path);

      if (!response.ok) throw new Error(`Failed to fetch ${path}`);
      try {
        const jsonData = await response.json();
        possibleValues = jsonData
          .filter(triggerCondition.filter)
          .map((item) => ({
            name: item.name,
            label: item.displayName,
          }));
      } catch (err) {
        throw new Error(`${path} does not exist!`);
      }
    }

    triggerConditions.push({
      name: triggerConditionType.name,
      label: triggerConditionType.label,
      description: triggerConditionType.description,
      value_type: triggerConditionType.value_type,
      possible_values: possibleValues,
      fields: [],
    });
  }

  return {
    name: trigger.name,
    label: trigger.label,
    description: trigger.description,
    possible_trigger_conditions: triggerConditions,
    selected_trigger_conditions: [],
  };
};

const triggerConditionMap = {
  block: {
    file: "blocks.json",
    filter: (block) => block,
  },
  entity: {
    file: "entities.json",
    filter: (entity) => entity,
  },
  mob: {
    file: "entities.json",
    filter: (entity) => entity.type === "hostile" || entity.type === "mob",
  },
  animal: {
    file: "entities.json",
    filter: (entity) => entity.type === "animal",
  },
  projectile: {
    file: "entities.json",
    filter: (entity) => entity.type === "projectile",
  },
  item: {
    file: "items.json",
    filter: (item) => item,
  },
  armor: {
    file: "items.json",
    filter: (item) =>
      item.enchantCategories?.includes("wearable") ||
      item.enchantCategories?.includes("armor") ||
      item.enchantCategories?.includes("equippable"),
  },
  biome: {
    file: "biomes.json",
    filter: (item) => item,
  },
  prime_cause: {
    content: prime_causes,
  },
  damage_cause: {
    content: damage_causes,
  },
  ignite_cause: {
    content: ignite_causes,
  },
  dimension: {
    content: dimensions,
  },
  time: {
    content: times,
  },
  inventory: {
    content: inventory_types,
  },
  empty: {
    content: [],
  },
};
