# digitan

This bot allows free media saving using Discord's CDN and links any image, video, tweet etc. to a custom alias given by users. You no longer need to buy nitro to get decent size stickers!

## Commands

The available commands are listed here:

- **show** - Show a media entry. Syntax: `digitan show <unique_alias|id>`
- **random** - Show a random media entry. Syntax: `digitan random`
- **list** - List all the saved aliases. Syntax: `digitan list`
- **info** - Get detailed information about a media entry. Syntax: `digitan info <unique_alias|id>`
- **add** - Add a new media entry. Syntax: `digitan add <unique_alias> <url>`
- **remove** - Remove a media entry. Syntax: `digitan remove <unique_alias|id>`
- **update:alias** - Update the alias for a media entry. Syntax: `digitan update <unique_alias|id> <new_unique_alias>`
- **update:url** - Update the url for a media entry. Syntax: `digitan update <unique_alias|id> <url>`
- **version** - Gives information about the current version. Syntax: `digitan version`
- **help** - Display this help with the bot. Syntax: `digitan help`

## Version history

### v1.1.2

Hotfix.

- List now displays beyond the 2000 character limit.

### v1.1.1

Hotfix.

- Corrected the unknown command case message again, that somehow wasn't fixed with v.1.0.1.

### v1.1.0

Minor enhancements and a few fixes.

- `update` and `remove` commands now accept both alias and ID as reference.
- `version` command has been added.
- Fixed `info` command to handle invalid URLs.
- Fixed `info` command to handle unknown media references.

### v1.0.1

Hotfix.

- Corrected the unknown command case message to print the right `help` command.
- Improved the argument filter to accept accidental empty spaces in excess.

### v1.0.0

Initial release.

- Essential `show`, `add`, `update` & `remove` commands.
- Additional `info`, `list`, `random` and `help` commands to provide a less-boring experience.
