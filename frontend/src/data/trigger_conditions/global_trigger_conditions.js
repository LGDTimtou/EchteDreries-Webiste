export const global_trigger_conditions = [
  {
    name: "dimension",
    label: "Dimension",
    description: "The dimension the player is currently in",
    value_type: "dimension",
    global_value_prefix: "",
  },
  {
    name: "biome",
    label: "Biome",
    description: "The biome the player is currently located in",
    value_type: "biome",
    global_value_prefix: "",
  },
  {
    name: "time",
    label: "Time",
    description: "The current in-game time in the player's world.",
    value_type: "time",
    global_value_prefix: "",
  },
  {
    name: "block_feet",
    label: "Feet Block",
    description:
      "The block the player is standing in (at their feet position).",
    value_type: "block",
    global_value_prefix: "feet",
  },
  {
    name: "block_under",
    label: "Block Under",
    description:
      "The block directly beneath the player (one block below their feet).",
    value_type: "block",
    global_value_prefix: "under",
  },
  {
    name: "block_head",
    label: "Head Block",
    description: "The block that intersects with the player's head position.",
    value_type: "block",
    global_value_prefix: "head",
  },
  {
    name: "block_above",
    label: "Block Above",
    description:
      "The block directly above the player's head (one block higher).",
    value_type: "block",
    global_value_prefix: "above",
  },
  {
    name: "boots",
    label: "Boots",
    description: "The item equipped in the player's boots slot.",
    value_type: "armor",
    global_value_prefix: "boots",
  },
  {
    name: "leggings",
    label: "Leggings",
    description: "The item equipped in the player's leggings slot.",
    value_type: "armor",
    global_value_prefix: "leggings",
  },
  {
    name: "chestplate",
    label: "Chestplate",
    description: "The item equipped in the player's chestplate slot.",
    value_type: "armor",
    global_value_prefix: "chestplate",
  },
  {
    name: "helmet",
    label: "Helmet",
    description: "The item equipped in the player's helmet slot.",
    value_type: "armor",
    global_value_prefix: "helmet",
  },
  {
    name: "hand",
    label: "Main Hand",
    description: "The item currently held in the player's main hand.",
    value_type: "item",
    global_value_prefix: "hand",
  },
  {
    name: "off_hand",
    label: "Off Hand",
    description: "The item currently held in the player's off-hand.",
    value_type: "item",
    global_value_prefix: "off_hand",
  },
  {
    name: "player_health_equals",
    label: "Player Health Equals",
    description:
      "Checks if the player's health exactly equals the specified value",
    value_type: "empty",
    global_value_prefix: "player_health",
  },
  {
    name: "player_health_greater_than",
    label: "Player Health Greater Than",
    description:
      "Checks if the player's health is greater than the specified value",
    value_type: "empty",
    global_value_prefix: "player_health",
  },
  {
    name: "player_health_less_than",
    label: "Player Health Less Than",
    description:
      "Checks if the player's health is less than the specified value",
    value_type: "empty",
    global_value_prefix: "player_health",
  },
];
