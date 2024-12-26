import YAML from 'yaml';

export const jsonToYaml = (formState) => {

    const enchantment_name = formState.enchantment_name.toLowerCase().replaceAll(" ", "_");

    const jsonEnchantment = {
        [enchantment_name]: {
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