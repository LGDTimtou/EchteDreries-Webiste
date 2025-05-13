export const trigger_condition_parameters = {
  player: [
    { name: "", description: "The player's name" },
    { name: "x", description: "The player's x coordinate" },
    { name: "y", description: "The player's x coordinate" },
    { name: "z", description: "The player's z coordinate" },
    { name: "health", description: "The player's health" },
  ],
  block: [
    { name: "block", description: "The type of the block" },
    { name: "block_x", description: "The x coordinate of the block" },
    { name: "block_y", description: "The y coordinate of the block" },
    { name: "block_z", description: "The z coordinate of the block" },
  ],
  entity: [
    { name: "", description: "The type of the entity" },
    { name: "x", description: "The entity's x coordinate" },
    { name: "y", description: "The entity's y coordinate" },
    { name: "z", description: "The entity's z coordinate" },
    { name: "health", description: "The entity's health" },
    {
      name: "tag",
      description:
        "A temporary unique scoreboard tag added to the entity, usable in commands",
    },
  ],
  item: [
    { name: "type", description: "The item type" },
    { name: "name", description: "The item's display name" },
    { name: "amount", description: "The item amount" },
  ],
  cause: [{ name: "cause", description: "The cause name" }],
  inventory: [{ name: "inv_type", description: "The inventory type" }],
  string: [{ name: "value", description: "The string value" }],
  double_equals: [
    { name: "value", description: "The value compared for equality" },
  ],
  double_greater_than: [
    { name: "value", description: "The value compared against (greater than)" },
  ],
  double_less_than: [
    { name: "value", description: "The value compared against (less than)" },
  ],
  dimension: [{ name: "name", description: "The name of the dimension" }],
  biome: [
    { name: "biome", description: "The biome name at the player’s location" },
  ],
  time: [
    { name: "ticks", description: "The world time in ticks" },
    { name: "day_night", description: "Whether it is day or night" },
  ],

  block_feet: [
    {
      name: "block",
      description: "The type of the block at the player's feet",
    },
    {
      name: "block_x",
      description: "The X coordinate of the block at the player's feet",
    },
    {
      name: "block_y",
      description: "The Y coordinate of the block at the player's feet",
    },
    {
      name: "block_z",
      description: "The Z coordinate of the block at the player's feet",
    },
  ],
  block_under: [
    { name: "block", description: "The type of the block under the player" },
    {
      name: "block_x",
      description: "The X coordinate of the block under the player",
    },
    {
      name: "block_y",
      description: "The Y coordinate of the block under the player",
    },
    {
      name: "block_z",
      description: "The Z coordinate of the block under the player",
    },
  ],
  block_head: [
    { name: "block", description: "The type of the block at head level" },
    {
      name: "block_x",
      description: "The X coordinate of the block at head level",
    },
    {
      name: "block_y",
      description: "The Y coordinate of the block at head level",
    },
    {
      name: "block_z",
      description: "The Z coordinate of the block at head level",
    },
  ],
  block_above: [
    {
      name: "block",
      description: "The type of the block above the player's head",
    },
    {
      name: "block_x",
      description: "The X coordinate of the block above the player",
    },
    {
      name: "block_y",
      description: "The Y coordinate of the block above the player",
    },
    {
      name: "block_z",
      description: "The Z coordinate of the block above the player",
    },
  ],
  boots: [
    { name: "type", description: "The type of boots the player is wearing" },
    { name: "name", description: "The custom name of the boots" },
    { name: "amount", description: "The quantity of the boots" },
  ],
  feet: [
    { name: "type", description: "The type of leggings the player is wearing" },
    { name: "name", description: "The custom name of the leggings" },
    { name: "amount", description: "The quantity of the leggings" },
  ],
  chestplate: [
    {
      name: "type",
      description: "The type of chestplate the player is wearing",
    },
    { name: "name", description: "The custom name of the chestplate" },
    {
      name: "amount",
      description: "The quantity of the chestplate",
    },
  ],
  helmet: [
    { name: "type", description: "The type of helmet the player is wearing" },
    { name: "name", description: "The custom name of the helmet" },
    { name: "amount", description: "The quantity of the helmet (usually 1)" },
  ],
  hand: [
    { name: "type", description: "The type of item in the player's main hand" },
    {
      name: "name",
      description: "The custom name of the item in the main hand",
    },
    {
      name: "amount",
      description: "The quantity of the item in the main hand",
    },
  ],
  off_hand: [
    { name: "type", description: "The type of item in the player's off-hand" },
    {
      name: "name",
      description: "The custom name of the item in the off-hand",
    },
    { name: "amount", description: "The quantity of the item in the off-hand" },
  ],
};

export const global_parameters = [
  {
    name: "player",
    description:
      "The display name of the player that triggered the enchantment",
  },
  {
    name: "player_x",
    description:
      "The x coordinate of the player that triggered the enchantment",
  },
  {
    name: "player_y",
    description:
      "The y coordinate of the player that triggered the enchantment",
  },
  {
    name: "player_z",
    description:
      "The z coordinate of the player that triggered the enchantment",
  },
  {
    name: "player_health",
    description: "The health of the player that triggered the enchantment",
  },
];
