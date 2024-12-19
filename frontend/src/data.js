export const versions = ["1.21.3", "1.21.1"]

const enchantment_targets_nested ={
    name: "all", 
    label: "All",
    overrides: [
        {
            name: "breakable",
            label: "Has Durability",
            overrides: [
                {
                    name: "wearable",
                    label: "Wearable",
                    overrides: [
                        {
                            name: "armor",
                            label: "Armor",
                            overrides: [
                                {
                                    name: "armor_feet",
                                    label: "Boots",
                                    overrides: []
                                },
                                {
                                    name: "armor_legs",
                                    label: "Leggings",
                                    overrides: []
                                },
                                {
                                    name: "armor_torso",
                                    label: "Chestplates",
                                    overrides: []
                                },
                                {
                                    name: "armor_head",
                                    label: "Helmets",
                                    overrides: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "weapon",
                    label: "Swords",
                    overrides: []
                },
                {
                    name: "tool",
                    label: "Tools",
                    overrides: []
                },
                {
                    name: "bow",
                    label: "Bows",
                    overrides: []
                },
                {
                    name: "crossbow",
                    label: "Crossbows",
                    overrides: []
                },
                {
                    name: "trident",
                    label: "Tridents",
                    overrides: []
                },
                {
                    name: "fishing_rod",
                    label: "Fishing Rods",
                    overrides: []
                }
            ]
        }

    ] 

}

export const enchantment_tags = [
    {
        name: "TRADEABLE",
        label: "Tradeable",
        description: "Enchantement can be found trading with villagers"
    },
    {
        name: "DOUBLE_TRADE_PRICE",
        label: "Double Trade Price",
        description: "Doubles the price of this enchantment when trading"
    },
    {
        name: "ON_MOB_SPAWN_EQUIPMENT",
        label: "On Mob Spawn Equipment",
        description: "Enchantment can be found on mobs' armor pieces"
    },
    {
        name: "ON_TRADED_EQUIPMENT",
        label: "On Traded Equipment",
        description: "Appears on equipment that is bought from villagers"
    },
    {
        name: "ON_RANDOM_LOOT",
        label: "On Random Loot",
        description: "Can be discovered in loot chests or dropped by mobs"
    },
    {
        name: "CURSE",
        label: "Curse",
        description: "Applies the curse effect to the enchantment"
    },
    {
        name: "SMELTS_LOOT",
        label: "Smelts Loot",
        description: "Automatically smelts loot dropped from blocks or entities"
    },
    {
        name: "PREVENTS_BEE_SPAWNS_WHEN_MINING",
        label: "Prevents Bee Spawns When Mining",
        description: "Stops bees from spawning when breaking hive-related blocks"
    },
    {
        name: "PREVENTS_DECORATED_POT_SHATTERING",
        label: "Prevents Decorated Pot Shattering",
        description: "Prevents decorated pots from breaking when mishandled"
    },
    {
        name: "PREVENTS_ICE_MELTING",
        label: "Prevents Ice Melting",
        description: "Prevents ice blocks from melting near heat sources"
    },
    {
        name: "PREVENTS_INFESTED_SPAWNS",
        label: "Prevents Infested Spawns",
        description: "Stops infested blocks from spawning silverfish or other pests"
    },
    {
        name: "TREASURE",
        label: "Treasure",
        description: "Can be found in lost treasure"
    },
    {
        name: "TRADES_DESERT_COMMON",
        label: "Trades Desert Common",
        description: "Commonly traded in desert biome villages"
    },
    {
        name: "TRADES_JUNGLE_COMMON",
        label: "Trades Jungle Common",
        description: "Commonly traded in jungle biome villages"
    },
    {
        name: "TRADES_PLAINS_COMMON",
        label: "Trades Plains Common",
        description: "Commonly traded in plains biome villages"
    },
    {
        name: "TRADES_SAVANNA_COMMON",
        label: "Trades Savanna Common",
        description: "Commonly traded in savanna biome villages"
    },
    {
        name: "TRADES_SNOW_COMMON",
        label: "Trades Snow Common",
        description: "Commonly traded in snow biome villages"
    },
    {
        name: "TRADES_SWAMP_COMMON",
        label: "Trades Swamp Common",
        description: "Commonly traded in swamp biome villages"
    },
    {
        name: "TRADES_TAIGA_COMMON",
        label: "Trades Taiga Common",
        description: "Commonly traded in taiga biome villages"
    },
    {
        name: "TRADES_DESERT_SPECIAL",
        label: "Trades Desert Special",
        description: "Special item traded in desert biome villages"
    },
    {
        name: "TRADES_JUNGLE_SPECIAL",
        label: "Trades Jungle Special",
        description: "Special item traded in jungle biome villages"
    },
    {
        name: "TRADES_PLAINS_SPECIAL",
        label: "Trades Plains Special",
        description: "Special item traded in plains biome villages"
    },
    {
        name: "TRADES_SAVANNA_SPECIAL",
        label: "Trades Savanna Special",
        description: "Special item traded in savanna biome villages"
    },
    {
        name: "TRADES_SNOW_SPECIAL",
        label: "Trades Snow Special",
        description: "Special item traded in snow biome villages"
    },
    {
        name: "TRADES_SWAMP_SPECIAL",
        label: "Trades Swamp Special",
        description: "Special item traded in swamp biome villages"
    },
    {
        name: "TRADES_TAIGA_SPECIAL",
        label: "Trades Taiga Special",
        description: "Special item traded in taiga biome villages"
    }
];


const flattenEnchantmentTargets = (target, parents = []) => {
    const { name, label, overrides } = target;
  
    parents.forEach((parent) => parent.overrides = [...parent.overrides, name])
    const newTarget = { name, label, overrides: [] };
  
    let flatTargets = [newTarget];
  
    if (overrides && overrides.length > 0) {
      overrides.forEach((child) => {
        flatTargets = flatTargets.concat(flattenEnchantmentTargets(child, [...parents, newTarget]));
      });
    }
  
    return flatTargets;
  };

export const enchantment_targets = flattenEnchantmentTargets(enchantment_targets_nested);


export const triggers_nested = {
    "armor": [
        {
            "name": "armor_de_equip",
            "description": "Triggered when a certain armor piece is taken off",
            "trigger_conditions": "armor"
        },
        {
            "name": "armor_equip",
            "description": "Triggered when a certain armor piece is put on",
            "trigger_conditions": "armor"
        }
    ],
    "block": [
        {
            "name": "block_damaged",
            "description": "Triggered when a certain block is damaged by the player",
            "trigger_conditions": "block"
        },
        {
            "name": "block_fertilize",
            "description": "Triggered when a certain block is fertilized by the player",
            "trigger_conditions": "block"
        },
        {
            "name": "block_ignite",
            "description": "Triggered when a certain block is ignited by the player",
            "trigger_conditions": "block"
        },
        {
            "name": "block_place",
            "description": "Triggered when a certain block is placed by the player",
            "trigger_conditions": "block"
        },
        {
            "name": "break_block",
            "description": "Triggered when a certain block is broken by the player",
            "trigger_conditions": "block"
        }
    ],
    "block_other": [
        {
            "name": "activate_sculk_sensor",
            "description": "Triggered when a sculk sensor is activated",
            "trigger_conditions": null
        },
        {
            "name": "bell_rung",
            "description": "Triggered when a bell is rung",
            "trigger_conditions": null
        },
        {
            "name": "change_sign",
            "description": "Triggered when a sign is changed",
            "trigger_conditions": null
        },
        {
            "name": "prime_tnt",
            "description": "Triggered when TNT is primed",
            "trigger_conditions": "prime_cause"
        }
    ],
    "click": [
        {
            "name": "left_click_item",
            "description": "Triggered when a held item is left-clicked",
            "trigger_conditions": "item"
        },
        {
            "name": "right_click_item",
            "description": "Triggered when a held item is right-clicked",
            "trigger_conditions": "item"
        }
    ],
    "damage": [
        {
            "name": "damage_animal",
            "description": "Triggered when an animal is damaged",
            "trigger_conditions": "animal"
        },
        {
            "name": "damage_entity",
            "description": "Triggered when an entity is damaged",
            "trigger_conditions": "entity"
        },
        {
            "name": "damage_mob",
            "description": "Triggered when a mob is damaged",
            "trigger_conditions": "mob"
        },
        {
            "name": "damage_player",
            "description": "Triggered when a player is damaged",
            "trigger_conditions": "empty"
        }
    ],
    "fishing_rod": [
        {
            "name": "fishing_rod_caught",
            "description": "Triggered when something is caught using a fishing rod",
            "trigger_conditions": "item"
        },
        {
            "name": "fishing_rod_hit_player",
            "description": "Triggered when a fishing rod hits a player",
            "trigger_conditions": "empty"
        }
    ],
    "health": [
        {
            "name": "player_health_change",
            "description": "Triggered when a player's health changes",
            "trigger_conditions": "double"
        },
        {
            "name": "player_health_decrease",
            "description": "Triggered when a player's health decreases",
            "trigger_conditions": "double"
        },
        {
            "name": "player_health_increase",
            "description": "Triggered when a player's health increases",
            "trigger_conditions": "double"
        }
    ],
    "inventory": [
        {
            "name": "inventory_close",
            "description": "Triggered when the inventory is closed",
            "trigger_conditions": "empty"
        }
    ],
    "kill": [
        {
            "name": "kill_animal",
            "description": "Triggered when an animal is killed",
            "trigger_conditions": "animal"
        },
        {
            "name": "kill_entity",
            "description": "Triggered when an entity is killed",
            "trigger_conditions": "entity"
        },
        {
            "name": "kill_mob",
            "description": "Triggered when a mob is killed",
            "trigger_conditions": "mob"
        },
        {
            "name": "kill_player",
            "description": "Triggered when a player is killed",
            "trigger_conditions": "empty"
        }
    ],
    "projectiles": [
        {
            "name": "arrow_hit_block",
            "description": "Triggered when an arrow hits a block",
            "trigger_conditions": "block"
        },
        {
            "name": "arrow_hit_entity",
            "description": "Triggered when an arrow hits an entity",
            "trigger_conditions": "entity"
        },
        {
            "name": "arrow_land",
            "description": "Triggered when an arrow lands",
            "trigger_conditions": null
        },
        {
            "name": "projectile_hit_block",
            "description": "Triggered when a projectile hits a block",
            "trigger_conditions": "block"
        },
        {
            "name": "projectile_hit_entity",
            "description": "Triggered when a projectile hits an entity",
            "trigger_conditions": "entity"
        },
        {
            "name": "projectile_land",
            "description": "Triggered when a projectile lands",
            "trigger_conditions": null
        },
        {
            "name": "snowball_hit_block",
            "description": "Triggered when a snowball hits a block",
            "trigger_conditions": "block"
        },
        {
            "name": "snowball_hit_entity",
            "description": "Triggered when a snowball hits an entity",
            "trigger_conditions": "entity"
        },
        {
            "name": "snowball_land",
            "description": "Triggered when a snowball lands",
            "trigger_conditions": null
        }
    ],
    "take_damage": [
        {
            "name": "take_damage_from_entity",
            "description": "Triggered when damage is taken from an entity",
            "trigger_conditions": "entity"
        },
        {
            "name": "take_damage_from_mob",
            "description": "Triggered when damage is taken from a mob",
            "trigger_conditions": "mob"
        },
        {
            "name": "take_damage_from_non_entity",
            "description": "Triggered when damage is taken from a non-entity",
            "trigger_conditions": "damage_cause"
        },
        {
            "name": "take_damage_from_player",
            "description": "Triggered when damage is taken from a player",
            "trigger_conditions": "empty"
        }
    ]
}

export const trigger_condition_descriptions = {
    block: "Select which blocks should trigger the enchantment (All by default)",
    entity: "Select which entities should trigger the enchantment (All by default)",
    mob: "Select which mobs should trigger the enchantment (All by default)",
    animal: "Select which animals should trigger the enchantment (All by default)",
    items: "Select which items should trigger the enchantment (All by default)",
    armor: "Select which armor should trigger the enchantment (All by default)",
    prime_cause: "Select what tnt prime cause should trigger the enchantment (All by default)",
    damage_causes: "Select which damage cause should trigger the enchantment (All by default)",
    empty: "Fill in what should trigger the enchantment (All by default)",
  };

function flattenAndAddLabels(triggersNested) {
    const titleCase = (str) =>
      str
        .replace(/_/g, " ")
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
  
    const flattenedList = [];
    Object.values(triggersNested).forEach((category) => {
      category.forEach((item) => {
        flattenedList.push({
          ...item,
          label: titleCase(item.name),
        });
      });
    });
    return flattenedList;
  }
  
export const triggers = flattenAndAddLabels(triggers_nested);



export const enchantments = [
    {
      "name": "aqua_affinity",
      "label": "Aqua Affinity",
      "description": "Increases underwater mining speed"
    },
    {
      "name": "bane_of_arthropods",
      "label": "Bane of Arthropods",
      "description": "Increases damage against arthropod enemies (e.g., spiders, silverfish)"
    },
    {
      "name": "blast_protection",
      "label": "Blast Protection",
      "description": "Reduces damage from explosions"
    },
    {
      "name": "channeling",
      "label": "Channeling",
      "description": "Causes your Trident to summon a lightning bolt when thrown during a thunderstorm"
    },
    {
      "name": "curse_of_binding",
      "label": "Curse of Binding",
      "description": "Prevents armor from being removed once equipped"
    },
    {
      "name": "curse_of_vanishing",
      "label": "Curse of Vanishing",
      "description": "Causes items to disappear when you die"
    },
    {
      "name": "depth_strider",
      "label": "Depth Strider",
      "description": "Increases movement speed underwater"
    },
    {
      "name": "efficiency",
      "label": "Efficiency",
      "description": "Increases mining speed"
    },
    {
      "name": "feather_falling",
      "label": "Feather Falling",
      "description": "Reduces fall damage"
    },
    {
      "name": "fire_aspect",
      "label": "Fire Aspect",
      "description": "Sets targets on fire when hit"
    },
    {
      "name": "fire_protection",
      "label": "Fire Protection",
      "description": "Reduces damage from fire"
    },
    {
      "name": "flame",
      "label": "Flame",
      "description": "Turns arrows into flaming arrows"
    },
    {
      "name": "fortune",
      "label": "Fortune",
      "description": "Increases the number of items dropped when mining certain blocks"
    },
    {
      "name": "frost_walker",
      "label": "Frost Walker",
      "description": "Creates ice blocks while walking over water and grants immunity to damage from certain blocks"
    },
    {
      "name": "impaling",
      "label": "Impaling",
      "description": "Increases attack damage of the Trident against underwater mobs"
    },
    {
      "name": "infinity",
      "label": "Infinity",
      "description": "Arrows are not consumed when shooting"
    },
    {
      "name": "knockback",
      "label": "Knockback",
      "description": "Increases knockback dealt to enemies"
    },
    {
      "name": "looting",
      "label": "Looting",
      "description": "Increases items dropped by mobs"
    },
    {
      "name": "loyalty",
      "label": "Loyalty",
      "description": "Returns the Trident after being thrown"
    },
    {
      "name": "luck_of_the_sea",
      "label": "Luck of the Sea",
      "description": "Increases chance of catching valuable items while fishing"
    },
    {
      "name": "lure",
      "label": "Lure",
      "description": "Decreases time to catch fish"
    },
    {
      "name": "mending",
      "label": "Mending",
      "description": "Repairs the item using experience orbs"
    },
    {
      "name": "multishot",
      "label": "Multishot",
      "description": "Shoots multiple arrows or projectiles at once"
    },
    {
      "name": "piercing",
      "label": "Piercing",
      "description": "Arrows fired can pierce through multiple entities"
    },
    {
      "name": "power",
      "label": "Power",
      "description": "Increases arrow damage"
    },
    {
      "name": "projectile_protection",
      "label": "Projectile Protection",
      "description": "Reduces damage from projectiles"
    },
    {
      "name": "protection",
      "label": "Protection",
      "description": "Reduces overall damage"
    },
    {
      "name": "punch",
      "label": "Punch",
      "description": "Increases arrow knockback"
    },
    {
      "name": "quick_charge",
      "label": "Quick Charge",
      "description": "Decreases time to reload a crossbow"
    },
    {
      "name": "respiration",
      "label": "Respiration",
      "description": "Extends underwater breathing time"
    },
    {
      "name": "riptide",
      "label": "Riptide",
      "description": "Propels the player forward when the Trident is thrown in water or rain"
    },
    {
      "name": "sharpness",
      "label": "Sharpness",
      "description": "Increases melee attack damage"
    },
    {
      "name": "silk_touch",
      "label": "Silk Touch",
      "description": "Mined blocks drop themselves instead of their usual items"
    },
    {
      "name": "smite",
      "label": "Smite",
      "description": "Increases damage against undead mobs"
    },
    {
      "name": "soul_speed",
      "label": "Soul Speed",
      "description": "Increases movement speed on Soul Sand and Soul Soil"
    },
    {
      "name": "sweeping_edge",
      "label": "Sweeping Edge",
      "description": "Increases damage of sweep attacks"
    },
    {
      "name": "swift_sneak",
      "label": "Swift Sneak",
      "description": "Increases movement speed while crouching"
    },
    {
      "name": "thorns",
      "label": "Thorns",
      "description": "Damages attackers when they deal melee damage"
    },
    {
      "name": "unbreaking",
      "label": "Unbreaking",
      "description": "Increases item durability by reducing the chance of durability loss"
    },
    {
      "name": "density",
      "label": "Density",
      "description": "Increases damage dealt by mace smash attacks based on fall distance"
    },
    {
      "name": "breach",
      "label": "Breach",
      "description": "Reduces the effectiveness of a target's armor when using a mace"
    },
    {
      "name": "wind_burst",
      "label": "Wind Burst",
      "description": "Grants a bounce-back effect after a successful mace smash attack, allowing for chained attacks"
    }
]
  

export const prime_causes = [
    {
      name: "fire",
      label: "Fire",
    },
    {
      name: "redstone",
      label: "Redstone",
    },
    {
      name: "player",
      label: "Player",
    },
    {
      name: "explosion",
      label: "Explosion",
    },
    {
      name: "projectile",
      label: "Projectile",
    },
    {
      name: "block_break",
      label: "Block Break",
    },
    {
      name: "dispenser",
      label: "Dispenser",
    },
]

export const damage_causes = [
    { name: "kill", label: "Kill" },
    { name: "world_border", label: "World Border" },
    { name: "contact", label: "Contact" },
    { name: "entity_attack", label: "Entity Attack" },
    { name: "entity_sweep_attack", label: "Entity Sweep Attack" },
    { name: "projectile", label: "Projectile" },
    { name: "suffocation", label: "Suffocation" },
    { name: "fall", label: "Fall" },
    { name: "fire", label: "Fire" },
    { name: "fire_tick", label: "Fire Tick" },
    { name: "melting", label: "Melting" },
    { name: "lava", label: "Lava" },
    { name: "drowning", label: "Drowning" },
    { name: "block_explosion", label: "Block Explosion" },
    { name: "entity_explosion", label: "Entity Explosion" },
    { name: "void", label: "Void" },
    { name: "lightning", label: "Lightning" },
    { name: "suicide", label: "Suicide" },
    { name: "starvation", label: "Starvation" },
    { name: "poison", label: "Poison" },
    { name: "magic", label: "Magic" },
    { name: "wither", label: "Wither" },
    { name: "falling_block", label: "Falling Block" },
    { name: "thorns", label: "Thorns" },
    { name: "dragon_breath", label: "Dragon Breath" },
    { name: "custom", label: "Custom" },
    { name: "fly_into_wall", label: "Fly Into Wall" },
    { name: "hot_floor", label: "Hot Floor" },
    { name: "cramming", label: "Cramming" },
    { name: "dryout", label: "Dryout" },
    { name: "freeze", label: "Freeze" },
    { name: "sonic_boom", label: "Sonic Boom" },
  ];