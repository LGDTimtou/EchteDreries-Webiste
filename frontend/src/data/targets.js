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
