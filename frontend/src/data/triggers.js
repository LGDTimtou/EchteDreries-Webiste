const health_trigger_conditions = [
  {
    name: "double_equals^health",
    label: "Health Equals",
    description:
      "Checks if the current health exactly equals the specified value",
    value_type: "empty",
  },
  {
    name: "double_greater_than^health",
    label: "Health Greater Than",
    description:
      "Checks if the current health is greater than the specified value",
    value_type: "empty",
  },
  {
    name: "double_less_than^health",
    label: "Health Less Than",
    description:
      "Checks if the current health is less than the specified value",
    value_type: "empty",
  },
  {
    name: "double_equals^previous_health",
    label: "Previous Health Equals",
    description:
      "Checks if the previous health exactly equals the specified value",
    value_type: "empty",
  },
  {
    name: "double_greater_than^previous_health",
    label: "Previous Health Greater Than",
    description:
      "Checks if the previous health is greater than the specified value",
    value_type: "empty",
  },
  {
    name: "double_less_than^previous_health",
    label: "Previous Health Less Than",
    description:
      "Checks if the previous health is less than the specified value",
    value_type: "empty",
  },
  {
    name: "double_equals^health_change",
    label: "Health Change Equals",
    description:
      "Checks if the amount of health changed exactly equals the specified value",
    value_type: "empty",
  },
  {
    name: "double_greater_than^health_change",
    label: "Health Change Greater Than",
    description:
      "Checks if the amount of health changed is greater than the specified value",
    value_type: "empty",
  },
  {
    name: "double_less_than^health_change",
    label: "Health Change Less Than",
    description:
      "Checks if the amount of health changed is less than the specified value",
    value_type: "empty",
  },
];

const movement_trigger_conditions = [
  {
    name: "double_equals^from_x",
    label: "From X Equals",
    description:
      "Checks if the X-coordinate of the origin position equals the specified value",
    value_type: "empty",
  },
  {
    name: "double_greater_than^from_x",
    label: "From X Greater Than",
    description:
      "Checks if the X-coordinate of the origin position is greater than the specified value",
    value_type: "empty",
  },
  {
    name: "double_less_than^from_x",
    label: "From X Less Than",
    description:
      "Checks if the X-coordinate of the origin position is less than the specified value",
    value_type: "empty",
  },
  {
    name: "double_equals^from_y",
    label: "From Y Equals",
    description:
      "Checks if the Y-coordinate of the origin position equals the specified value",
    value_type: "empty",
  },
  {
    name: "double_greater_than^from_y",
    label: "From Y Greater Than",
    description:
      "Checks if the Y-coordinate of the origin position is greater than the specified value",
    value_type: "empty",
  },
  {
    name: "double_less_than^from_y",
    label: "From Y Less Than",
    description:
      "Checks if the Y-coordinate of the origin position is less than the specified value",
    value_type: "empty",
  },
  {
    name: "double_equals^from_z",
    label: "From Z Equals",
    description:
      "Checks if the Z-coordinate of the origin position equals the specified value",
    value_type: "empty",
  },
  {
    name: "double_greater_than^from_z",
    label: "From Z Greater Than",
    description:
      "Checks if the Z-coordinate of the origin position is greater than the specified value",
    value_type: "empty",
  },
  {
    name: "double_less_than^from_z",
    label: "From Z Less Than",
    description:
      "Checks if the Z-coordinate of the origin position is less than the specified value",
    value_type: "empty",
  },
];

export const triggers_nested = {
  armor: [
    {
      name: "armor_de_equip",
      description: "Triggered when an armor piece is removed or replaced.",
      trigger_conditions: [
        {
          name: "item^new_armor",
          label: "New armor piece",
          description:
            "The armor piece that is equipped in place of the old one. This can be 'AIR' if no new armor is equipped. Defaults to any",
          value_type: "armor",
        },
        {
          name: "item^old_armor",
          label: "Old armor piece",
          description:
            "The armor piece that was previously equipped and is now removed. Defaults to any",
          value_type: "armor",
        },
      ],
    },
    {
      name: "armor_equip",
      description:
        "Triggered when an armor piece is equipped, whether replacing another or equipping into an empty slot.",
      trigger_conditions: [
        {
          name: "item^new_armor",
          label: "New armor piece",
          description:
            "The armor piece that is being equipped. Defaults to any",
          value_type: "armor",
        },
        {
          name: "item^old_armor",
          label: "Old armor piece",
          description:
            "The armor piece that was replaced. Will be 'AIR' if the slot was previously empty. Defaults to any",
          value_type: "armor",
        },
      ],
    },
  ],
  block: [
    {
      name: "block_damaged",
      description: "Triggered when the player damages a block",
      trigger_conditions: [
        {
          name: "block",
          label: "Damaged Block",
          description: "The block that was damaged. Defaults to any",
          value_type: "block",
        },
      ],
    },
    {
      name: "block_fertilize",
      description: "Triggered when the player fertilizes a block",
      trigger_conditions: [
        {
          name: "block",
          label: "Fertilized Block",
          description: "The block that was fertilized. Defaults to any",
          value_type: "block",
        },
      ],
    },
    {
      name: "block_ignite",
      description: "Triggered the player ignites a block",
      trigger_conditions: [
        {
          name: "block",
          label: "Ignited Block",
          description: "The block that was ignited. Defaults to any",
          value_type: "block",
        },
        {
          name: "cause^ignite",
          label: "Ignite Cause",
          description: "What caused this block to ignite. Defaults to any",
          value_type: "ignite_cause",
        },
      ],
    },
    {
      name: "block_place",
      description: "Triggered when a certain block is placed by the player",
      trigger_conditions: [
        {
          name: "block^placed",
          label: "Placed Block",
          description: "The block that was placed. Defaults to any",
          value_type: "block",
        },
        {
          name: "block^against",
          label: "Placed Against Block",
          description: "The block that it was placed against. Defaults to any",
          value_type: "block",
        },
      ],
    },
    {
      name: "block_break",
      description: "Triggered when a certain block is broken by the player",
      trigger_conditions: [
        {
          name: "block",
          label: "Broken Block",
          description: "The block that was broken. Defaults to any",
          value_type: "block",
        },
      ],
    },
  ],
  block_other: [
    {
      name: "activate_sculk_sensor",
      description: "Triggered when a sculk sensor is activated",
      trigger_conditions: [],
    },
    {
      name: "bell_rung",
      description: "Triggered when a bell is rung",
      trigger_conditions: [],
    },
    {
      name: "change_sign",
      description: "Triggered when a sign is changed",
      trigger_conditions: [
        {
          name: "string^lines",
          label: "String Lines",
          description:
            "The lines of the sign (regexes can be used). Defaults to any",
          value_type: "empty",
        },
      ],
    },
    {
      name: "prime_tnt",
      description: "Triggered when TNT is primed",
      trigger_conditions: [
        {
          name: "cause^prime",
          label: "Prime Cause",
          description: "What caused this TNT to prime. Defaults to any",
          value_type: "empty",
        },
      ],
    },
  ],
  click: [
    {
      name: "left_click",
      description: "Triggered when the player left-clicks",
      trigger_conditions: [],
    },
    {
      name: "right_click",
      description: "Triggered when the player right-clicks",
      trigger_conditions: [],
    },
  ],
  damage: [
    {
      name: "damage_animal",
      description: "Triggered when the player damages an animal",
      trigger_conditions: [
        {
          name: "entity^animal",
          label: "Damaged Animal",
          description: "The animal that was damaged. Defaults to any",
          value_type: "animal",
        },
      ],
    },
    {
      name: "damage_entity",
      description: "Triggered when the player damages an entity",
      trigger_conditions: [
        {
          name: "entity^entity",
          label: "Damaged Entity",
          description: "The entity that was damaged. Defaults to any",
          value_type: "entity",
        },
      ],
    },
    {
      name: "damage_mob",
      description: "Triggered when the player damages a mob",
      trigger_conditions: [
        {
          name: "entity^mob",
          label: "Damaged Mob",
          description: "The mob that was damaged. Defaults to any",
          value_type: "mob",
        },
      ],
    },
    {
      name: "damage_player",
      description: "Triggered when the player damages another player",
      trigger_conditions: [
        {
          name: "player^damaged",
          label: "Damaged Player",
          description: "The player that was damaged. Defaults to any",
          value_type: "empty",
        },
      ],
    },
  ],
  fishing_rod: [
    {
      name: "fishing_rod_caught",
      description: "Triggered when an item is caught using a fishing rod",
      example: "fishing_rod_caught",
      trigger_conditions: [
        {
          name: "item^caught",
          label: "Caught Item",
          description: "The item that was caught. Defaults to any",
          value_type: "item",
        },
      ],
    },
    {
      name: "fishing_rod_hit_entity",
      description: "Triggered when a fishing rod hits an entity",
      trigger_conditions: [
        {
          name: "entity^hit",
          label: "Hit Entity",
          description: "The entity that was hit. Defaults to any",
          value_type: "entity",
        },
      ],
    },
    {
      name: "fishing_rod_hit_player",
      description: "Triggered when a fishing rod hits a player",
      trigger_conditions: [
        {
          name: "player^hit",
          label: "Hit Player",
          description: "The player that was hit. Defaults to any",
          value_type: "empty",
        },
      ],
    },
  ],
  health: [
    {
      name: "player_health_change",
      description: "Triggered when the player's health changes",
      trigger_conditions: health_trigger_conditions,
    },
    {
      name: "player_health_decrease",
      description: "Triggered when the player's health decreases",
      trigger_conditions: health_trigger_conditions,
    },
    {
      name: "player_health_increase",
      description: "Triggered when the player's health increases",
      trigger_conditions: health_trigger_conditions,
    },
  ],
  inventory: [
    {
      name: "inventory_close",
      description: "Triggered when the player closes an inventory",
      trigger_conditions: [
        {
          name: "inventory^top",
          label: "Top Inventory",
          description: "The top inventory that was closed",
          value_type: "inventory",
        },
        {
          name: "inventory^bottom",
          label: "Bottom Inventory",
          description: "The bottom inventory that was closed",
          value_type: "inventory",
        },
        {
          name: "string^title",
          label: "Inventory Title",
          description: "The title of the inventory that was closed",
          value_type: "empty",
        },
      ],
    },
  ],
  kill: [
    {
      name: "kill_animal",
      description: "Triggered when the player kills an animal",
      trigger_conditions: [
        {
          name: "entity^animal",
          label: "Killed Animal",
          description: "The animal that was killed. Defaults to any",
          value_type: "animal",
        },
      ],
    },
    {
      name: "kill_entity",
      description: "Triggered when the player kills an entity",
      trigger_conditions: [
        {
          name: "entity^entity",
          label: "Killed Entity",
          description: "The entity that was killed. Defaults to any",
          value_type: "entity",
        },
      ],
    },
    {
      name: "kill_mob",
      description: "Triggered when the player kills a mob",
      trigger_conditions: [
        {
          name: "entity^mob",
          label: "Killed Mob",
          description: "The mob that was killed. Defaults to any",
          value_type: "mob",
        },
      ],
    },
    {
      name: "kill_player",
      description: "Triggered when the player kills another player",
      trigger_conditions: [
        {
          name: "player^killed",
          label: "Killed Player",
          description: "The player that was killed. Defaults to any",
          value_type: "empty",
        },
      ],
    },
  ],
  movement: [
    {
      name: "player_move",
      description: "Triggered when the player moves",
      trigger_conditions: movement_trigger_conditions,
    },
    {
      name: "player_swim",
      description: "Triggered when the player swims",
      trigger_conditions: movement_trigger_conditions,
    },
    {
      name: "player_sneak",
      description: "Triggered when the player sneaks",
      trigger_conditions: [],
    },
  ],
  projectiles: [
    {
      name: "projectile_hit_block",
      description:
        "Triggered when a projectile launched by the player hits a block",
      trigger_conditions: [
        {
          name: "entity^projectile",
          label: "Projectile",
          description: "The projectile that was launched. Defaults to any",
          value_type: "projectile",
        },
        {
          name: "block",
          label: "Hit Block",
          description: "The block that was hit. Defaults to any",
          value_type: "block",
        },
      ],
    },
    {
      name: "projectile_hit_entity",
      description:
        "Triggered when a projectile launched by the player hits an entity",
      trigger_conditions: [
        {
          name: "entity^projectile",
          label: "Projectile",
          description: "The projectile that was launched. Defaults to any",
          value_type: "projectile",
        },
        {
          name: "entity^entity",
          label: "Hit Entity",
          description: "The entity that was hit. Defaults to any",
          value_type: "entity",
        },
      ],
    },
    {
      name: "projectile_hit_player",
      description:
        "Triggered when a projectile launched by the player hits a player",
      trigger_conditions: [
        {
          name: "entity^projectile",
          label: "Projectile",
          description: "The projectile that was launched. Defaults to any",
          value_type: "projectile",
        },
        {
          name: "player^vicitm",
          label: "Hit Player",
          description: "The player that was hit. Defaults to any",
          value_type: "empty",
        },
      ],
    },
    {
      name: "projectile_land",
      description: "Triggered when a projectile launched by the player lands",
      example: "projectile_land",
      trigger_conditions: [
        {
          name: "entity^projectile",
          label: "Projectile",
          description: "The projectile that was launched. Defaults to any",
          value_type: "projectile",
        },
      ],
    },
  ],
  take_damage: [
    {
      name: "take_damage_from_entity",
      description: "Triggered when the player takes damage from an entity",
      trigger_conditions: [
        {
          name: "entity^entity",
          label: "Damaging Entity",
          description: "The entity that damaged the player. Defaults to any",
          value_type: "entity",
        },
        {
          name: "cause^damage",
          label: "Damage Cause",
          description: "What caused the damage. Defaults to any",
          value_type: "damage_cause",
        },
      ],
    },
    {
      name: "take_damage_from_mob",
      description: "Triggered when the player takes damage from a mob",
      trigger_conditions: [
        {
          name: "entity^mob",
          label: "Damaging Mob",
          description: "The mob that damaged the player. Defaults to any",
          value_type: "mob",
        },
        {
          name: "cause^damage",
          label: "Damage Cause",
          description: "What caused the damage. Defaults to any",
          value_type: "damage_cause",
        },
      ],
    },
    {
      name: "take_damage_from_player",
      description: "Triggered when the player takes damage from another player",
      trigger_conditions: [
        {
          name: "player^damager",
          label: "Damaging Player",
          description: "The player that damaged the player. Defaults to any",
          value_type: "empty",
        },
        {
          name: "cause^damage",
          label: "Damage Cause",
          description: "What caused the damage. Defaults to any",
          value_type: "damage_cause",
        },
      ],
    },
    {
      name: "take_damage_from_non_entity",
      description: "Triggered when the player takes damage from a non-entity",
      trigger_conditions: [
        {
          name: "cause^damage",
          label: "Damage Cause",
          description: "What caused the damage. Defaults to any",
          value_type: "damage_cause",
        },
      ],
    },
  ],
  chat: [
    {
      name: "player_chat",
      description: "Triggered when the player sends a chat message",
      trigger_conditions: [
        {
          name: "string^message",
          label: "Message",
          description: "The message that the player sent",
          value_type: "empty",
        },
        {
          name: "double_equals^length",
          label: "Length Equals",
          description:
            "Checks if the message length exactly equals the specified value",
          value_type: "empty",
        },
        {
          name: "double_greater_than^length",
          label: "Length Greater Than",
          description:
            "Checks if the message length is greater than the specified value",
          value_type: "empty",
        },
        {
          name: "double_less_than^length",
          label: "Length Less Than",
          description:
            "Checks if the message length is less than the specified value",
          value_type: "empty",
        },
      ],
    },
    {
      name: "player_receive_chat",
      description: "Triggered when the player receives a chat message",
      trigger_conditions: [
        {
          name: "string^message",
          label: "Message",
          description: "The message that the player received",
          value_type: "empty",
        },
        {
          name: "double_equals^length",
          label: "Length Equals",
          description:
            "Checks if the message length exactly equals the specified value",
          value_type: "empty",
        },
        {
          name: "double_greater_than^length",
          label: "Length Greater Than",
          description:
            "Checks if the message length is greater than the specified value",
          value_type: "empty",
        },
        {
          name: "double_less_than^length",
          label: "Length Less Than",
          description:
            "Checks if the message length is less than the specified value",
          value_type: "empty",
        },
      ],
    },
  ],
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
