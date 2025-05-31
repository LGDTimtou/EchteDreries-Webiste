import {triggerConditionGroups} from "./triggerConditionGroups";
import {combineStrings} from "../../util/util";
import {globalTriggerConditions} from "./globalTriggerConditions";

export const global_parameters = [
    {
        name: "enchantment",
        description: "The namespaced name of the enchantment",
    },
    {
        name: "enchantment_lore",
        description: "The lore name of the enchantment",
    },
    {
        name: "enchantment_level",
        description: "The level of the enchantment",
    },
    {
        name: "enchantment_level_roman",
        description: "The level of the enchantment in roman numerals",
    },
];

export const cooldown_message_parameters = [
    {
        name: "time_left",
        description: "The time left on the cooldown in seconds",
    },
    {
        name: "time_left_full_out",
        description:
            "The time left on the cooldown in full output format (e.g., 1 minute, 30 seconds)",
    },
];


export const conditionsToParameters = (conditions) => {
    return conditions.flatMap(
        (triggerConditionParent) => {
            return triggerConditionGroups[triggerConditionParent.group].values.map(triggerCondition => (
                {
                    name: combineStrings("_", triggerConditionParent.prefix, triggerConditionParent.group, triggerCondition.suffix),
                    group: combineStrings("_", triggerConditionParent.prefix, triggerConditionParent.group),
                    description: triggerCondition.description + triggerConditionParent.description
                }
            ))

        }
    )
}

export const globalConditionParameters = conditionsToParameters(globalTriggerConditions)
