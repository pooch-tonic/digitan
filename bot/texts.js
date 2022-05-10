const packageJson = require("../package.json");

const help = `Here are the commands you can use:
**show** - Show a media entry. Syntax: \`${process.env.COMMAND_PREFIX} show <unique_alias|id>\`
**random** - Show a random media entry. Syntax: \`${process.env.COMMAND_PREFIX} random\`
**list** - List all the saved aliases. Syntax: \`${process.env.COMMAND_PREFIX} list\`
**info** - Get detailed information about a media entry. Syntax: \`${process.env.COMMAND_PREFIX} info <unique_alias|id>\`
**add** - Add a new media entry. Syntax: \`${process.env.COMMAND_PREFIX} add <unique_alias> <url>\`
**remove** - Remove a media entry. Syntax: \`${process.env.COMMAND_PREFIX} remove <unique_alias|id>\`
**update:alias** - Update the alias for a media entry. Syntax: \`${process.env.COMMAND_PREFIX} update <unique_alias|id> <new_unique_alias>\`
**update:url** - Update the url for a media entry. Syntax: \`${process.env.COMMAND_PREFIX} update <unique_alias|id> <url>\`
**version** - Give information about the current version. Syntax: \`${process.env.COMMAND_PREFIX} version\`
`;

const unknownCommand = `Sorry, I couldn't understand your request... Type \`${process.env.COMMAND_PREFIX} help\` to display related commands.`;

const version = `**Current version: \`${packageJson.version}\`**
For more information, please read the release notes: https://github.com/pooch-tonic/digitan/releases`;

module.exports = {
  help,
  unknownCommand,
  version,
};
