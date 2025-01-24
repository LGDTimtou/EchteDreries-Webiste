export const command_functions = [
    {
      name: "$[mul(x1, x2, ...)]",
      description: "Multiply the given values together = x1 * x2 * ..."
    },
    {
      name: "$[div(x1, x2, ...)]",
      description: "Divide the given values = x1 / x2 / ..."
    },
    {
      name: "$[add(x1, x2, ...)]",
      description: "Adds the given values together = x1 + x2 + ..."
    },
    {
      name: "$[sub(x1, x2, ...)]",
      description: "Subtracts the given values from each other = x1 - x2 - ..."
    },
    {
      name: "$[random()]",
      description: "Returns a random number between 0 and 1"
    },
    {
      round: "$[round(value, decimalPlaces)]",
      description: "Rounds the given value to the specified number of decimal places"
    }

  ]