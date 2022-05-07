const help = `Here are the commands you can use:
**show** - Show a media entry. Syntax: \`${process.env.COMMAND_PREFIX} show <unique_alias|id>\`
**random** - Show a random media entry. Syntax: \`${process.env.COMMAND_PREFIX} random\`
**list** - List all the saved aliases. Syntax: \`${process.env.COMMAND_PREFIX} list\`
**info** - Get detailed information about a media entry. Syntax: \`${process.env.COMMAND_PREFIX} info <unique_alias|id>\`
**add** - Add a new media entry. Syntax: \`${process.env.COMMAND_PREFIX} add <unique_alias> <url>\`
**remove** - Remove a media entry. Syntax: \`${process.env.COMMAND_PREFIX} remove <id>\`
**update:alias** - Update the alias for a media entry. Syntax: \`${process.env.COMMAND_PREFIX} update <id> <unique_alias>\`
**update:url** - Update the url for a media entry. Syntax: \`${process.env.COMMAND_PREFIX} update <id> <url>\`
`;

const unknownCommand = `Sorry, I couldn't understand your request... Type \`${process.env.COMMAND_PREFIX} help\` to display related commands.`;

module.exports = {
  help,
  unknownCommand,
};
