export const command_functions = [
  {
    name: "$[mul(x1, x2, ...)]",
    autocomplete: "$[mul(,)]",
    description: "Multiply the given values together = x1 * x2 * ...",
  },
  {
    name: "$[div(x1, x2, ...)]",
    autocomplete: "$[div(,)]",
    description: "Divide the given values = x1 / x2 / ...",
  },
  {
    name: "$[add(x1, x2, ...)]",
    autocomplete: "$[add(,)]",
    description: "Adds the given values together = x1 + x2 + ...",
  },
  {
    name: "$[sub(x1, x2, ...)]",
    autocomplete: "$[sub(,)]",
    description: "Subtracts the given values from each other = x1 - x2 - ...",
  },
  {
    name: "$[random()]",
    autocomplete: "$[random()]",
    description: "Returns a random number between 0 and 1",
  },
  {
    name: "$[round(x, d)]",
    autocomplete: "$[round(,)]",
    description:
      "Rounds the value x to the specified number of decimal places d",
  },
  {
    name: "$[sin(x)]",
    autocomplete: "$[sin()]",
    description: "Computes the sin of the given value x",
  },
  {
    name: "$[cos(x)]",
    autocomplete: "$[cos()]",
    description: "Computes the cos of the given value x",
  },
];
