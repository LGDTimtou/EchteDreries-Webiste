export const global_trigger_conditions = [
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
