const isEmpty = (item) => {
    return item.toString().trim() === ""
}

const constraints = [
    {
        check: (formState) => isEmpty(formState.enchantment_name),
        message: "Enchantment Name cannot be empty!"
    },
    {
        check: (formState) => isEmpty(formState.anvil_cost),
        message: "Anvil Cost cannot be empty!"
    },
    {
        check: (formState) => formState.in_enchanting_table && isEmpty(formState.weight),
        message: "Enchanting Table Weight cannot be empty!"
    },
    {
        check: (formState) => formState.in_enchanting_table && (
            isEmpty(formState.min_cost_base) || 
            isEmpty(formState.min_cost_incr) ||
            isEmpty(formState.max_cost_base) ||
            isEmpty(formState.max_cost_incr)
        ),
        message: "Enchanting Table Costs cannot be empty!"
    },
    {
        check: (formState) => formState.triggers.length === 0,
        message: "The enchantment must have at least one trigger!"
    },
    {
        check: (formState) => formState.conflicts_with.includes(formState.enchantment_name.trim().toLowerCase().replaceAll(' ', '_')),
        message: "Enchantment cannot conflict with itself!"
    },
    {
        check: (formState) => formState.levels.some((level) => isEmpty(level.cooldown)),
        message: "Cooldown for Level cannot be empty!"
    },
    {
        check: (formState) => formState.levels.some((level) => isEmpty(level.chance)),
        message: "Chance for Level cannot be empty!"
    },
    {
        check: (formState) => formState.levels.some((level) => 
            level.commands.some((command) => isEmpty(command.value))
        ),
        message: "Value for Level Instruction cannot be empty!"
    },
    {
        check: (formState) => formState.min_cost_base < 1 || formState.min_cost_base > 30,
        message: "Min Cost Base must be between 1 and 30!"
    },
    {
        check: (formState) => formState.max_cost_base < 1 || formState.max_cost_base > 30,
        message: "Max Cost Base must be between 1 and 30!"
    },
    {
        check: (formState) => formState.min_cost_incr < 0 || formState.min_cost_incr > 30,
        message: "Min Cost Increment must be between 0 and 30!"
    },
    {
        check: (formState) => formState.max_cost_incr < 0 || formState.max_cost_incr > 30,
        message: "Max Cost Increment must be between 0 and 30!"
    },
    {
        check: (formState) => formState.in_enchanting_table && (formState.weight < 1 || formState.weight > 1024),
        message: "Enchanting Table Weight must be between 1 and 1024!"
    },
    {
        check: (formState) => formState.levels.some((level) => level.cooldown < 0),
        message: "Cooldown for Level must be greater than or equal to 0!"
    },
    {
        check: (formState) => formState.levels.some((level) => level.chance < 0.01 || level.chance > 100),
        message: "Chance for Level must be between 0.01 and 100!"
    },
    {
        check: (formState) => formState.levels.some((level) => 
            level.commands.some((command) => command.type === "delay" && command.value < 0)
        ),
        message: "Delay for Level Instruction must be greater than or equal to 0!"
    }
    
]


export const checkConstraints = (formState) => {
    return constraints.reduce((acc, constraint) => {
            if (constraint.check(formState)) acc.push(constraint.message);
            return acc;
        }, 
    []);
}