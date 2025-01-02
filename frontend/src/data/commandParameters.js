export const command_parameters = [
    {
      name: "player",
      description: "The player triggering the enchantment",
      triggers: ["global"],
    },
    {
      name: "x",
      description: "The x coordinate of the player triggering the enchantment",
      triggers: ["global"],
    },
    {
      name: "y",
      description: "The y coordinate of the player triggering the enchantment",
      triggers: ["global"],
    },
    {
      name: "z",
      description: "The z coordinate of the player triggering the enchantment",
      triggers: ["global"],
    },
    {
      name: "new_armor_piece",
      description: "The newly equipped armor piece (can be null)",
      triggers: ["armor_equip", "armor_de_equip"],
    },
    {
      name: "old_armor_piece",
      description: "The last equipped armor piece (can be null)",
      triggers: ["armor_equip", "armor_de_equip"],
    },
    {
      name: "armor_type",
      description: "The type of the armor equipped",
      triggers: ["armor_equip", "armor_de_equip"],
    },
    {
      name: "block_x",
      description: "The x coordinate of the block in question",
      triggers: ["block_damaged", "block_ignite", "block_place", "block_break"],
    },
    {
      name: "block_y",
      description: "The y coordinate of the block in question",
      triggers: ["block_damaged", "block_ignite", "block_place", "block_break"],
    },
    {
      name: "block_z",
      description: "The z coordinate of the block in question",
      triggers: ["block_damaged", "block_ignite", "block_place", "block_break"],
    },
    {
      name: "block",
      description: "The type of the block in question",
      triggers: [
        "block_damaged",
        "block_fertilize",
        "block_ignite",
        "block_place",
        "block_break",
        "projectile_hit_block",
        "arrow_hit_block",
        "snowball_hit_block",
      ],
    },
    {
      name: "cause",
      description: "What caused this to trigger",
      triggers: [
        "block_ignite",
        "prime_tnt",
        "take_damage_from_non_entity",
      ],
    },
    {
      name: "lines",
      description: "The new lines of the sign stored in an array",
      triggers: ["change_sign"],
    },
    {
      name: "item",
      description: "The type of the item in question",
      triggers: ["left_click_item", "right_click_item"],
    },
    {
      name: "caught",
      description: "The entity that was caught with your fishing rod",
      triggers: ["fishing_rod_caught"]
    },
    {
      name: "animal",
      description: "The type of the animal in question",
      triggers: ["damage_animal", "kill_animal"],
    },
    {
      name: "entity",
      description: "The type of the entity in question",
      triggers: [
        "damage_entity",
        "kill_entity",
        "projectile_hit_entity",
        "arrow_hit_entity",
        "snowball_hit_entity",
        "take_damage_from_entity",
      ],
    },
    {
      name: "mob",
      description: "The type of the mob in question",
      triggers: ["damage_mob", "kill_mob", "take_damage_from_mob"],
    },
    {
      name: "damaged",
      description: "The player that was hit",
      triggers: ["damage_player", "fishing_rod_hit_player"],
    },
    {
      name: "health",
      description: "The player's current health",
      triggers: [
        "player_health_change",
        "player_health_decrease",
        "player_health_increase",
      ],
    },
    {
      name: "health_change",
      description: "The amount the player's health changed",
      triggers: [
        "player_health_change",
        "player_health_decrease",
        "player_health_increase",
      ],
    },
    {
      name: "previous_health",
      description: "The player's previous health",
      triggers: [
        "player_health_change",
        "player_health_decrease",
        "player_health_increase",
      ],
    },
    {
      name: "type",
      description: "The inventory type",
      triggers: ["inventory_close"],
    },
    {
      name: "killed",
      description: "The player that was killed",
      triggers: ["kill_player"],
    },
    {
      name: "projectile_x",
      description: "The x coordinate of the projectile in question",
      triggers: [
        "projectile_hit_block",
        "arrow_hit_block",
        "snowball_hit_block",
        "projectile_hit_entity",
        "arrow_hit_entity",
        "snowball_hit_entity",
        "projectile_land",
        "arrow_land",
        "snowball_land",
      ],
    },
    {
      name: "projectile_y",
      description: "The y coordinate of the projectile in question",
      triggers: [
        "projectile_hit_block",
        "arrow_hit_block",
        "snowball_hit_block",
        "projectile_hit_entity",
        "arrow_hit_entity",
        "snowball_hit_entity",
        "projectile_land",
        "arrow_land",
        "snowball_land",
      ],
    },
    {
      name: "projectile_z",
      description: "The z coordinate of the projectile in question",
      triggers: [
        "projectile_hit_block",
        "arrow_hit_block",
        "snowball_hit_block",
        "projectile_hit_entity",
        "arrow_hit_entity",
        "snowball_hit_entity",
        "projectile_land",
        "arrow_land",
        "snowball_land",
      ],
    },
    {
      name: "damager",
      description: "The player that caused the damage",
      triggers: ["take_damage_from_player"],
    },
    {
      name: "entity_x",
      description: "The x coordinate of the entity in question",
      triggers: [
        "damage_animal",
        "damage_entity",
        "damage_mob",
        "fishing_rod_caught",
        "kill_animal",
        "kill_entity",
        "kill_mob",
        "projectile_hit_entity",
        "take_damage_from_entity",
        "take_damage_from_mob"
      ]
    },
    {
      name: "entity_y",
      description: "The y coordinate of the entity in question",
      triggers: [
        "damage_animal",
        "damage_entity",
        "damage_mob",
        "fishing_rod_caught",
        "kill_animal",
        "kill_entity",
        "kill_mob",
        "projectile_hit_entity",
        "take_damage_from_entity",
        "take_damage_from_mob"
      ]
    },
    {
      name: "entity_z",
      description: "The z coordinate of the entity in question",
      triggers: [
        "damage_animal",
        "damage_entity",
        "damage_mob",
        "fishing_rod_caught",
        "kill_animal",
        "kill_entity",
        "kill_mob",
        "projectile_hit_entity",
        "take_damage_from_entity",
        "take_damage_from_mob"
      ]
    },
    {
      name: "entity_tag",
      description: "A tag to reference the entity in question, e.g. @e[tag=%entity_tag%]",
      triggers: [
        "damage_animal",
        "damage_entity",
        "damage_mob",
        "fishing_rod_caught",
        "kill_animal",
        "kill_entity",
        "kill_mob",
        "projectile_hit_entity",
        "take_damage_from_entity",
        "take_damage_from_mob"
      ]
    },
    {
      name: "projectile_tag",
      description: "A tag to reference the projectile in question, e.g. @e[tag=%projectile_tag%]",
      triggers: [
        "projectile_hit_block",
        "projectile_hit_entity",
        "projectile_land"
      ]
    }
  ];