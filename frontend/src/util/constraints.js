const isEmpty = (item) => {
  return item.toString().trim() === "";
};

const checkInstructionsRecursively = (instructions, callback) => {
  for (const instruction of instructions) {
    if (instruction.type === "repeat") {
      if (callback(instruction)) return true;
      if (
        checkInstructionsRecursively(instruction.value.instructions, callback)
      )
        return true;
    } else {
      if (callback(instruction)) return true;
    }
  }
  return false;
};

const constraints = [
  {
    check: (formState) => isEmpty(formState.enchantment_name),
    message: "Enchantment Name cannot be empty!",
  },
  {
    check: (formState) => isEmpty(formState.anvil_cost),
    message: "Anvil Cost cannot be empty!",
  },
  {
    check: (formState) =>
      formState.in_enchanting_table && isEmpty(formState.weight),
    message: "Enchanting Table Weight cannot be empty!",
  },
  {
    check: (formState) =>
      formState.in_enchanting_table &&
      (isEmpty(formState.min_cost_base) ||
        isEmpty(formState.min_cost_incr) ||
        isEmpty(formState.max_cost_base) ||
        isEmpty(formState.max_cost_incr)),
    message: "Enchanting Table Costs cannot be empty!",
  },
  {
    check: (formState) => formState.triggers.length === 0,
    message: "The enchantment must have at least one trigger!",
  },
  {
    check: (formState) =>
      formState.conflicts_with.includes(
        formState.enchantment_name.trim().toLowerCase().replaceAll(" ", "_")
      ),
    message: "Enchantment cannot conflict with itself!",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some((level) => isEmpty(level.cooldown))
      ),
    message: "Cooldown for Level cannot be empty!",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some((level) => isEmpty(level.chance))
      ),
    message: "Chance for Level cannot be empty!",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some((level) =>
          checkInstructionsRecursively(
            level.instructions,
            (instruction) =>
              instruction.type === "command" && isEmpty(instruction.value)
          )
        )
      ),
    message: "Command Instruction value cannot be empty!",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some((level) =>
          checkInstructionsRecursively(
            level.instructions,
            (instruction) =>
              instruction.type === "delay" && isEmpty(instruction.value)
          )
        )
      ),
    message: "Delay Instruction value cannot be empty!",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some((level) =>
          checkInstructionsRecursively(
            level.instructions,
            (instruction) => {
              const parsedFloat = parseFloat(instruction.value);
              return instruction.type === "delay" && !isNaN(parsedFloat) && parsedFloat < 0.05
            }
          )
        )
      ),
    message: "Delay Instruction value cannot be lower than 0.05s (1 tick)",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some((level) =>
          checkInstructionsRecursively(
            level.instructions,
            (instruction) =>
              (instruction.type === "save" || instruction.type === "load") &&
              isEmpty(instruction.value.identifier)
          )
        )
      ),
    message: "Save/Load instruction identifier cannot be empty!",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some((level) =>
          checkInstructionsRecursively(
            level.instructions,
            (instruction) =>
              instruction.type === "save" && isEmpty(instruction.value.value)
          )
        )
      ),
    message: "Save instruction value cannot be empty!",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some((level) =>
          checkInstructionsRecursively(
            level.instructions,
            (instruction) =>
              instruction.type === "repeat" &&
              (isEmpty(instruction.value.amount) ||
                isEmpty(instruction.value.loop_parameter))
          )
        )
      ),
    message: "Repeat Instruction amount or loop parameter cannot be empty!",
  },
  {
    check: (formState) =>
      formState.min_cost_base < 1 || formState.min_cost_base > 30,
    message: "Min Cost Base must be between 1 and 30!",
  },
  {
    check: (formState) =>
      formState.max_cost_base < 1 || formState.max_cost_base > 30,
    message: "Max Cost Base must be between 1 and 30!",
  },
  {
    check: (formState) =>
      formState.min_cost_incr < 0 || formState.min_cost_incr > 30,
    message: "Min Cost Increment must be between 0 and 30!",
  },
  {
    check: (formState) =>
      formState.max_cost_incr < 0 || formState.max_cost_incr > 30,
    message: "Max Cost Increment must be between 0 and 30!",
  },
  {
    check: (formState) =>
      formState.in_enchanting_table &&
      (formState.weight < 1 || formState.weight > 1024),
    message: "Enchanting Table Weight must be between 1 and 1024!",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some((level) => level.cooldown < 0)
      ),
    message: "Cooldown for Level must be greater than or equal to 0!",
  },
  {
    check: (formState) =>
      formState.triggers.some((trigger) =>
        trigger.levels.some(
          (level) => level.chance < 0.01 || level.chance > 100
        )
      ),
    message: "Chance for Level must be between 0.01 and 100!",
  },
];

export const checkConstraints = (formState) => {
  return constraints.reduce((acc, constraint) => {
    if (constraint.check(formState)) acc.push(constraint.message);
    return acc;
  }, []);
};
