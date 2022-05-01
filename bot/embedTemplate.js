const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

await lib.discord.channels["@0.3.0"].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: "",
  tts: false,
  embeds: [
    {
      type: "rich",
      title: `Media info`,
      description: `**alias:** bourbon_confused\n\n**URL:** https://cdn.discordapp.com/attachments/931124159935823913/969333367504007168/F372C09D-5047-49DC-B549-1C09AE43BB80.jpg\n\n\n**ID:** 626d884a27970e12037d0ddf\n\n**uploaded by:** user on date\n\n**last updated by:** user on date`,
      color: 0xff0055,
      image: {
        url: `https://cdn.discordapp.com/attachments/931124159935823913/969333367504007168/F372C09D-5047-49DC-B549-1C09AE43BB80.jpg`,
        height: 50,
        width: 60,
      },
    },
  ],
});
