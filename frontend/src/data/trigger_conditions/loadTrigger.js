import { times } from "./values/time";
import { dimensions } from "./values/dimensions";
import { prime_causes } from "./values/causes/primeCauses";
import { ignite_causes } from "./values/causes/igniteCauses";
import { damage_causes } from "./values/causes/damageCauses";

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
  empty: {
    content: [],
  },
};

const global_trigger_conditions = [
  {
    name: "dimension",
    label: "Dimension",
    description: "The dimension the player is currently in",
    value_type: "dimension",
  },
  {
    name: "biome",
    label: "Biome",
    description: "The biome the player is currently located in",
    value_type: "biome",
  },
  {
    name: "time",
    label: "Time",
    description: "The current in-game time in the player's world.",
    value_type: "time",
  },
  {
    name: "block_feet",
    label: "Feet Block",
    description:
      "The block the player is standing in (at their feet position).",
    value_type: "block",
  },
  {
    name: "block_under",
    label: "Block Under",
    description:
      "The block directly beneath the player (one block below their feet).",
    value_type: "block",
  },
  {
    name: "block_head",
    label: "Head Block",
    description: "The block that intersects with the player's head position.",
    value_type: "block",
  },
  {
    name: "block_above",
    label: "Block Above",
    description:
      "The block directly above the player's head (one block higher).",
    value_type: "block",
  },
  {
    name: "boots",
    label: "Boots",
    description: "The item equipped in the player's boots slot.",
    value_type: "armor",
  },
  {
    name: "leggings",
    label: "Leggings",
    description: "The item equipped in the player's leggings slot.",
    value_type: "armor",
  },
  {
    name: "chestplate",
    label: "Chestplate",
    description: "The item equipped in the player's chestplate slot.",
    value_type: "armor",
  },
  {
    name: "helmet",
    label: "Helmet",
    description: "The item equipped in the player's helmet slot.",
    value_type: "armor",
  },
  {
    name: "hand",
    label: "Main Hand",
    description: "The item currently held in the player's main hand.",
    value_type: "item",
  },
  {
    name: "off_hand",
    label: "Off Hand",
    description: "The item currently held in the player's off-hand.",
    value_type: "item",
  },
];
