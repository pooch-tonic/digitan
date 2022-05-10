const urlRegex =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const getInfoEmbed = (media, uploaderNickname, updaterNickname) => ({
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
  image: urlRegex.test(media.url)
    ? {
        url: media.url,
      }
    : null,
});

module.exports = {
  getInfoEmbed,
};
