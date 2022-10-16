const {
  getMediaByAlias,
  getMediaByAliasOrId,
  addMedia,
  getRandomMedia,
  getAllAliases,
  updateMediaAliasById,
  updateMediaUrlById,
  removeMediaById,
} = require("./mediaManager");
const { getInfoEmbed } = require("./embedTemplate");
const { MessageEmbed } = require("discord.js");
const { parse } = require("dotenv");

const ALIASES_PER_PAGE = 50;

const getUserNickname = async (msg, uid) => {
  return await msg.guild.members.fetch(uid);
};

const handleAdd = async (msg, args) => {
  if (args.length <= 2) {
    if (args[0]) {
      if (args[1]) {
        if (!(await getMediaByAlias(args[0]))) {
          const res = await addMedia(args[0], args[1], msg.author.id);
          return result(
            true,
            `Woo! ***${args[0]}*** has been added to my database. *(ID: ${res})*`
          );
        }
        return result(false, "Alias is already taken!");
      }
      return result(false, "Please give me a link after your alias.");
    }
    return result(false, "Please give me an alias and a link.");
  }
  return result(false, "Too many arguments!");
};

const handleRemove = async (arg) => {
  if (arg) {
    const media = await getMediaByAliasOrId(arg);
    if (media) {
      const deletedId = await removeMediaById(media._id);
      if (deletedId) {
        return result(
          true,
          `Done! Media of ID *${deletedId}* has been removed from my database.`
        );
      }
      return result(
        false,
        `For some reason, I couldn't delete the given media...`
      );
    }
    return result(false, "I can't find any media matching that alias or ID.");
  }
  return result(false, "Please give me a media ID.");
};

const handleAliasUpdate = async (msg, args) => {
  if (args.length <= 2) {
    if (args[0]) {
      if (args[1]) {
        const media = await getMediaByAliasOrId(args[0]);
        if (media) {
          const updatedId = await updateMediaAliasById(
            media._id,
            args[1],
            msg.author.id
          );
          return result(
            true,
            `Done! Media of ID *${updatedId}* has a new alias ***${args[1]}***.`
          );
        }
        return result(
          false,
          "I can't find any media matching that alias or ID."
        );
      }
      return result(false, "Please give me its new alias.");
    }
    return result(
      false,
      "Please give me the current alias (or media ID) and its new alias."
    );
  }
  return result(false, "Too many arguments!");
};

const handleUrlUpdate = async (msg, args) => {
  if (args.length <= 2) {
    if (args[0]) {
      if (args[1]) {
        const media = await getMediaByAliasOrId(args[0]);
        if (media) {
          const updatedId = await updateMediaUrlById(
            media._id,
            args[1],
            msg.author.id
          );
          return result(
            true,
            `Done! Media of ID *${updatedId}* has a new url ${args[1]}.`
          );
        }
        return result(
          false,
          "I can't find any media matching that alias or ID."
        );
      }
      return result(false, "Please give me its new url.");
    }
    return result(
      false,
      "Please give me the current alias (or media ID) and its new url."
    );
  }
  return result(false, "Too many arguments!");
};

const handleList = async (stringPage = 1) => {
  const aliases = await getAllAliases();
  const total = aliases.length;
  const pages = Math.ceil(total / ALIASES_PER_PAGE);
  const page = parseInt(stringPage);
  if (!Number.isFinite(page) || page < 1 || page > pages) {
    return result(
      false,
      `Please provide a valid page number (from 1 to ${pages}).`
    );
  }
  let listString = "";
  aliases
    .slice((page - 1) * ALIASES_PER_PAGE, page * ALIASES_PER_PAGE)
    .forEach((e) => (listString += `${e}\n`));
  return result(
    true,
    `Here are some of my ${total} saved media aliases (page ${page}/${pages}):
    >>> ${listString}`
  );
};

const handleInfo = async (msg, args) => {
  if (args.length <= 1) {
    if (args[0]) {
      const media = await getMediaByAliasOrId(args[0]);
      if (media) {
        const uploaderNickname = await getUserNickname(msg, media.uploaderId);
        const updaterNickname =
          media.uploaderId === media.updaterId
            ? uploaderNickname
            : await getUserNickname(msg, media.updaterId);
        return result(
          true,
          new MessageEmbed(
            getInfoEmbed(media, uploaderNickname, updaterNickname)
          )
        );
      }
      return result(false, "Sorry, I couldn't find that media...");
    }
    return result(false, "Please give me an alias or media ID.");
  }
  return result(false, "Too many arguments!");
};

const handleShow = async (args) => {
  if (args.length <= 1) {
    if (args[0]) {
      const media = await getMediaByAliasOrId(args[0]);
      if (media) {
        return result(true, `*${media.alias}*\n${media.url}`);
      }
      return result(false, "Sorry, I couldn't find that media...");
    }
    return result(false, "Please give me an alias or media ID.");
  }
  return result(false, "Too many arguments!");
};

const handleRandom = async () => {
  const media = await getRandomMedia();
  return result(true, `*${media.alias}*\n${media.url}`);
};

const result = (success, msg) => ({ success, msg });

module.exports = {
  handleAdd,
  handleRandom,
  handleRemove,
  handleAliasUpdate,
  handleUrlUpdate,
  handleInfo,
  handleShow,
  handleList,
};
