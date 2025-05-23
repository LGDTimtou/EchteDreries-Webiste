export const built_in_commands = [
  {
    name: "/ce add <enchantment> [level]",
    permission: "add",
    description:
      "Applies the specified enchantment to the item currently held by the player, with an optional level. Set 'allow_unsafe_enchantments' to true in config.yml for unsafe enchantments (same functionality as vanilla /enchant command)",
  },
  {
    name: "/ce remove <enchantment>",
    permission: "remove",
    description:
      "Remove a specific enchantment from the item currently held by the player.",
  },
  {
    name: "/ce create",
    permission: "create",
    description:
      "Quickly design and configure custom enchantments using the web builder, then seamlessly load them into your server without manual file editing.",
  },
  {
    name: "/ce edit",
    permission: "edit",
    description:
      "Quickly update your custom enchantments using the web builder and reload them without needing to manually modify configuration files.",
  },
  {
    name: "/ce info",
    permission: "info",
    description:
      "Get an overview of your available default and custom enchantments.",
  },
  {
    name: "/ce reload",
    permission: "reload",
    description:
      "Reloads the plugin configuration files.",
  },
];
