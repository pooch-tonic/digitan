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
const { help, unknownCommand, version } = require("./texts");
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
      const args = getArgs(msg);
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
          msg.channel.send(listRes.msg, { split: true });
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
          msg.channel.send(
            infoRes.success ? { embeds: [infoRes.msg] } : infoRes.msg
          );
          break;
        case "version":
          msg.channel.send(version);
          break;
        case "help":
          msg.channel.send(help);
          break;
        default:
          msg.channel.send(unknownCommand);
      }
    }
  });

  //make sure this line is the last line
  client.login(process.env.CLIENT_TOKEN); //login bot using token
};

const stopBot = () => {
  client.destroy();
};

// Ignore empty strings if consecutive whitespaces are accidentally used
const getArgs = (msg) =>
  msg.content
    .split(" ", process.env.MAX_ARGS)
    .filter((e) => e && e !== "")
    .slice(1);

module.exports = {
  startBot,
  stopBot,
};
