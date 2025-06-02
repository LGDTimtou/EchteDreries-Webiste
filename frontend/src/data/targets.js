const enchantment_targets_nested = {
    name: "enchantable/durability",
    label: "Has Durability",
    overrides: [
        {
            name: "enchantable/mining_loot",
            label: "Tools",
            overrides: [
                {
                    name: "pickaxes",
                    label: "Pickaxes"
                },
                {
                    name: "axes",
                    label: "Axes"
                },
                {
                    name: "shovels",
                    label: "Shovels"
                },
                {
                    name: "hoes",
                    label: "Hoes"
                }
            ]
        },
        {
            name: "enchantable/armor",
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

        },
        {
            name: "swords",
            label: "Swords",
            overrides: []
        },
        {
            name: "skulls",
            label: "Skulls"
        }
    ]


}

const flattenEnchantmentTargets = (target, parents = []) => {
    const {name, label, overrides} = target;

    parents.forEach((parent) => parent.overrides = [...parent.overrides, name])
    const newTarget = {name, label, overrides: []};

    let flatTargets = [newTarget];

    if (overrides && overrides.length > 0) {
        overrides.forEach((child) => {
            flatTargets = flatTargets.concat(flattenEnchantmentTargets(child, [...parents, newTarget]));
        });
    }

    return flatTargets;
};

export const enchantment_targets = flattenEnchantmentTargets(enchantment_targets_nested);
