export const versions = ["1.21.3", "1.21.1"]

export const triggers = {
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