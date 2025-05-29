export const globalTriggerConditions = [
    {
        group: "player",
        prefix: "",
        description: "the player that triggered the enchantment"
    },
    {
        group: "world",
        prefix: "",
        description: "the world the player is currently in",
    },
    {
        group: "biome",
        prefix: "",
        description: "the biome the player is currently located in",
    },
    {
        group: "number",
        prefix: "time",
        description: "the current in-game time in the player's world.",
    },
    {
        group: "block",
        prefix: "feet",
        description: "the block that intersects with the player's feet position",
    },
    {
        group: "block",
        prefix: "under_feet",
        description: "the block directly beneath the player",
    },
    {
        group: "block",
        prefix: "head",
        description: "the block that intersects with the player's head position.",
    },
    {
        group: "block",
        prefix: "above_head",
        description: "the block directly above the player's head",
    },
    {
        group: "item",
        prefix: "boots",
        description: "the item equipped in the player's boots slot.",
        value_type: "armor"
    },
    {
        group: "item",
        prefix: "leggings",
        description: "the item equipped in the player's leggings slot.",
        value_type: "armor",
    },
    {
        group: "item",
        prefix: "chestplate",
        description: "the item equipped in the player's chestplate slot.",
        value_type: "armor",
    },
    {
        group: "item",
        prefix: "helmet",
        description: "the item equipped in the player's helmet slot.",
        value_type: "armor",
    },
    {
        group: "item",
        prefix: "main_hand",
        description: "the item currently held in the player's main hand.",
        value_type: "item",
    },
    {
        group: "item",
        prefix: "off_hand",
        description: "the item currently held in the player's off-hand.",
        value_type: "item",
    },
];
