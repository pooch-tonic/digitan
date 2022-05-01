const {
  getMediaByAlias,
  getMediaById,
  addMedia,
  getRandomMedia,
  getAllAliases,
  updateMediaAliasById,
  updateMediaUrlById,
  removeMediaById,
} = require("./mediaManager");
const { MessageEmbed } = require("discord.js");

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

const handleRemove = async (id) => {
  if (id) {
    const deletedId = await removeMediaById(id);
    if (deletedId) {
      return result(
        true,
        `Done! Media of ID *${deletedId}* has been removed from my database.`
      );
    }
    return result(false, "The media for this ID doesn't exist!");
  }
  return result(false, "Please give me a media ID.");
};

const handleAliasUpdate = async (msg, args) => {
  if (args.length <= 2) {
    if (args[0]) {
      if (args[1]) {
        const updatedId = await updateMediaAliasById(
          args[0],
          args[1],
          msg.author.id
        );
        return result(
          true,
          `Done! Media of ID *${updatedId}* has a new alias ***${args[1]}***.`
        );
      }
      return result(false, "Please give me its new alias.");
    }
    return result(false, "Please give me the media ID and its new alias.");
  }
  return result(false, "Too many arguments!");
};

const handleUrlUpdate = async (msg, args) => {
  if (args.length <= 2) {
    if (args[0]) {
      if (args[1]) {
        const updatedId = await updateMediaUrlById(
          args[0],
          args[1],
          msg.author.id
        );
        return result(
          true,
          `Done! Media of ID *${updatedId}* has a new url ${args[1]}.`
        );
      }
      return result(false, "Please give me its new url.");
    }
    return result(false, "Please give me the media ID and its new url.");
  }
  return result(false, "Too many arguments!");
};

const handleList = async () => {
  const aliases = await getAllAliases();
  let listString = "";
  aliases.forEach((e) => (listString += `${e}; `));
  return result(
    true,
    `Here are all of my ${aliases.length} saved media aliases:\n> *${listString}*`
  );
};

const handleInfo = async (msg, args) => {
  if (args.length <= 1) {
    if (args[0]) {
      let media = null;
      if (/^[a-f\d]{24}$/i.test(args[0])) {
        media = await getMediaById(args[0]);
      } else {
        media = await getMediaByAlias(args[0]);
      }
      if (media) {
        const uploaderNickname = await getUserNickname(msg, media.uploaderId);
        const updaterNickname =
          media.uploaderId === media.updaterId
            ? uploaderNickname
            : await getUserNickname(msg, media.updaterId);
        return result(
          true,
          new MessageEmbed({
            title: `Media info`,
            description: `**alias:** ${media.alias}\n\n**URL:** ${
              media.url
            }\n\n\n**ID:** ${
              media._id
            }\n\n**uploaded by:** ${uploaderNickname} on ${new Date(
              media.createdAt
            ).toUTCString()}\n\n**last updated by:** ${updaterNickname} on ${new Date(
              media.updatedAt
            ).toUTCString()}`,
            color: 0xff0055,
            image: {
              url: media.url,
            },
          })
        );
      }
      return result(false, "Sorry, I couldn't find that media...");
    }
    return result(false, "Please give me an alias or ID.");
  }
  return result(false, "Too many arguments!");
};

const handleShow = async (args) => {
  if (args.length <= 1) {
    if (args[0]) {
      let media = null;
      if (/^[a-f\d]{24}$/i.test(args[0])) {
        media = await getMediaById(args[0]);
      } else {
        media = await getMediaByAlias(args[0]);
      }
      if (media) {
        return result(true, `*${media.alias}*\n${media.url}`);
      }
      return result(false, "Sorry, I couldn't find that media...");
    }
    return result(false, "Please give me an alias or ID.");
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
