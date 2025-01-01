import YAML from 'yaml';
import { toTitleCase } from './util';
import { versions } from '../data/versions';
import { enchantment_targets } from '../data/targets';
import { enchantment_tags } from '../data/tags';
import { triggers } from '../data/triggers';
import { loadTrigger } from '../components/custom_enchants/content_pages/custom_enchant_builder/TriggerSelectField';

export const defaultFormState = {
  minecraft_version: versions[0],
  enchantment_name: "",
  targets: [],
  tags: [],
  conflicts_with: [],
  anvil_cost: 2,
  in_enchanting_table: true,
  weight: 10,
  min_cost_base: 2,
  min_cost_incr: 1,
  max_cost_base: 5,
  max_cost_incr: 1,
  cooldown_message: "&7You, &6%player%&7, have to wait %time_left% or %time_left_full_out% before you can use %enchantment% again!",
  levels: [
    {
      cooldown: 60,
      chance: 100,
      cancel_event: false,
      commands: []
    }
  ],
  triggers: []
}


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

export const yamlToJson = async (yaml) => {
    const jsonEnchantment = YAML.parse(yaml);
    const enchantmentName = Object.keys(jsonEnchantment)[0];
    const enchantmentData = jsonEnchantment[enchantmentName];
    const definition = enchantmentData.definition ?? {};
    const filteredTags = Object.keys(definition.tags ?? {}).filter(key => definition.tags[key])

    const formState = JSON.parse(JSON.stringify(defaultFormState));

    formState.enchantment_name = toTitleCase(enchantmentName);
    formState.minecraft_version = versions.includes(enchantmentData.version) ? enchantmentData.version: formState.minecraft_version;
    formState.anvil_cost = definition.anvil_cost ?? formState.anvil_cost;
    formState.conflicts_with = (definition.conflicts_with ?? []).map((name) => ({ name: name, label: toTitleCase(name)}));
    formState.targets = enchantment_targets.filter((target) => ((definition.targets ?? []).includes(target.name)));
    formState.tags = enchantment_tags.filter((tag) => (filteredTags.includes(tag.name.toLowerCase())))
    formState.cooldown_message = enchantmentData.cooldown_message ?? formState.cooldown_message;
    formState.in_enchanting_table = (definition.tags ?? {}).in_enchanting_table ?? formState.in_enchanting_table;

    if (formState.in_enchanting_table) {
        formState.weight = definition.enchanting_table?.weight ?? formState.weight;
        formState.min_cost_base = definition.enchanting_table?.min_cost_base ?? formState.min_cost_base;
        formState.min_cost_incr = definition.enchanting_table?.min_cost_incr ?? formState.min_cost_incr;
        formState.max_cost_base = definition.enchanting_table?.max_cost_base ?? formState.max_cost_base;
        formState.max_cost_incr = definition.enchanting_table?.max_cost_incr ?? formState.max_cost_incr;
    }

    const tempTriggers = triggers.filter((trigger) => (Object.keys(enchantmentData.triggers) ?? []).includes(trigger.name))
    formState.triggers = await Promise.all(tempTriggers.map((trigger) => loadTrigger(trigger, formState.minecraft_version)));

    //formState.levels = enchantmentData.levels.map((level) => )
    
    return formState;
}