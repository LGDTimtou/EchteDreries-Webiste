import YAML from 'yaml';

export const jsonToYaml = (formState) => {

    const enchantment_name = formState.enchantment_name.toLowerCase().replaceAll(" ", "_");

    const jsonEnchantment = {
        [enchantment_name]: {
        version: formState.minecraft_version,
        enabled: true,
        definition: {
            max_level: formState.levels.length,
            anvil_cost: formState.anvil_cost,
            conflicts_with: formState.conflicts_with.map((enchantment) => (enchantment.name)),
            targets: formState.targets.map((target) => (target.name)),
            tags: Object.assign({}, 
            ...formState.tags.map((tag) => ({[tag.name.toLowerCase()]: true}))
            )
        },
        triggers: Object.assign({}, 
            ...formState.triggers.map((trigger) => ({
            [trigger.name]: trigger.fields.map(
                (field) => (field.name)
            )
            }))
        ),
        levels: Object.assign({},
            ...formState.levels.map((level, index) => ({
            [index+1]: {
                cancel_event: level.cancel_event,
                cooldown: level.cooldown,
                chance: level.chance,
                commands: level.commands.map((command) => (
                `${command.type === "delay" ? "delay " : ""}${command.value}`
                ))
            }
            }))
        )
        }
    }
    
    if (formState.in_enchanting_table) {
        jsonEnchantment[enchantment_name].definition.tags["in_enchanting_table"] = true
        jsonEnchantment[enchantment_name].definition["enchanting_table"] = {
            weight: formState.weight,
            min_cost_base: formState.min_cost_base,
            min_cost_incr: formState.min_cost_incr,
            max_cost_base: formState.max_cost_base,
            max_cost_incr: formState.max_cost_incr,
        }
    }

    if (formState.cooldown_message.trim() !== "")
        jsonEnchantment[enchantment_name]["cooldown_message"] = formState.cooldown_message;
    
    const doc = new YAML.Document();
    doc.contents = jsonEnchantment;

    return doc.toString().replace(/"(\d+)"/g, "$1");
}

export const yamlToJson = (yaml) => {
    const jsonEnchantment = YAML.parse(yaml);
    const enchantmentName = Object.keys(jsonEnchantment)[0];
    const enchantmentData = jsonEnchantment[enchantmentName];
    const definition = enchantmentData.definition;

    const formState = {
        enchantment_name: enchantmentName.replace(/_/g, " "),
        minecraft_version: definition.version,
        anvil_cost: definition.anvil_cost,
        levels: Object.entries(enchantmentData.levels).map(([level, data]) => ({
            cancel_event: data.cancel_event,
            cooldown: data.cooldown,
            chance: data.chance,
            commands: data.commands.map((command) => {
                if (command.startsWith("delay ")) {
                    return { type: "delay", value: command.replace("delay ", "") };
                }
                return { type: "normal", value: command };
            }),
        })),
        conflicts_with: definition.conflicts_with.map((name) => ({ name })),
        targets: definition.targets.map((name) => ({ name })),
        tags: Object.entries(definition.tags)
            .filter(([key, value]) => value)
            .map(([name]) => ({ name })),
        triggers: Object.entries(enchantmentData.triggers).map(([name, fields]) => ({
            name,
            fields: fields.map((fieldName) => ({ name: fieldName })),
        })),
        in_enchanting_table: !!definition.tags.in_enchanting_table,
        cooldown_message: enchantmentData.cooldown_message || "",
    };

    if (formState.in_enchanting_table) {
        formState.weight = definition.enchanting_table.weight;
        formState.min_cost_base = definition.enchanting_table.min_cost_base;
        formState.min_cost_incr = definition.enchanting_table.min_cost_incr;
        formState.max_cost_base = definition.enchanting_table.max_cost_base;
        formState.max_cost_incr = definition.enchanting_table.max_cost_incr;
    }

    return formState;
}