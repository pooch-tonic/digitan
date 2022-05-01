const { Client, Intents } = require("discord.js"); //import discord.js
const {
  handleAdd,
  handleInfo,
  handleShow,
  handleRandom,
  handleList,
  handleAliasUpdate,
  handleUrlUpdate,
  handleRemove,
} = require("./mediaController");
const { help, unknownCommand } = require("./texts");
const { MessageEmbed } = require("discord.js");

let client;

const startBot = () => {
  client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_MESSAGES,
    ],
    partials: ["MESSAGE", "CHANNEL"],
  }); //create new client

  client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("messageCreate", async (msg) => {
    if (
      !msg.member.user.bot &&
      msg.content.startsWith(process.env.COMMAND_PREFIX)
    ) {
      const args = msg.content.split(" ", process.env.MAX_ARGS).slice(1);
      switch (args[0]) {
        case "ping":
          msg.channel.send("Pong!");
          break;
        case "add":
          const addRes = await handleAdd(msg, args.slice(1));
          msg.channel.send(
            (addRes.success ? ":tada: " : ":warning: ") + addRes.msg
          );
          break;
        case "list":
          const listRes = await handleList();
          msg.channel.send(listRes.msg);
          break;
        case "update:alias":
          const updateAliasRes = await handleAliasUpdate(msg, args.slice(1));
          msg.channel.send(
            (updateAliasRes.success ? ":white_check_mark: " : ":warning: ") +
              updateAliasRes.msg
          );
          break;
        case "update:url":
          const updateUrlRes = await handleUrlUpdate(msg, args.slice(1));
          msg.channel.send(
            (updateUrlRes.success ? ":white_check_mark: " : ":warning: ") +
              updateUrlRes.msg
          );
          break;
        case "remove":
          const removeUrlRes = await handleRemove(args[1]);
          msg.channel.send(
            (removeUrlRes.success ? ":white_check_mark: " : ":warning: ") +
              removeUrlRes.msg
          );
          break;
        case "random":
          const randRes = await handleRandom();
          msg.channel.send(":bookmark: " + randRes.msg);
          break;
        case "show":
          const showRes = await handleShow(args.slice(1));
          msg.channel.send(
            (showRes.success ? ":bookmark: " : ":warning: ") + showRes.msg
          );
          break;
        case "info":
          const infoRes = await handleInfo(msg, args.slice(1));
          msg.channel.send({ embeds: [infoRes.msg] });
          break;
        case "help":
          msg.channel.send(help);
          break;
        default:
          msg.channel.send(unknownCommand);
      }
    }
  });

  /*client.on("interactionCreate", (interaction) => {
    if (!interaction.isAutocomplete()) return; // We return if the interaction is not a AutoCompleteInteraction
    if (interaction.commandName === 'autocomplete') { // check if they used the command /autocomplete
      console.log('Typing in our command')
    }
    const currentValue = interaction.options.getFocused();
    if (currentValue.startsWith("Foo")) {
      interaction
        .respond([
          {
            name: "Foobar",
            value: "Foobar",
          },
          {
            name: "Food",
            value: "Food",
          },
        ])
        .then(console.log)
        .catch(console.error);
      return;
    }
    if (currentValue.startsWith("Test")) {
      interaction
        .respond([
          {
            name: "Test1",
            value: "Test1",
          },
          {
            name: "Test2",
            value: "Test2",
          },
        ])
        .then(console.log)
        .catch(console.error);
      return;
    }
  });*/

  //make sure this line is the last line
  client.login(process.env.CLIENT_TOKEN); //login bot using token
};

const stopBot = () => {
  client.destroy();
};

module.exports = {
  startBot,
  stopBot,
};
