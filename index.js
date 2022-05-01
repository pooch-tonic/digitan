require("dotenv").config(); //initialize dotenv
const { connect } = require("./mongo");
const { startBot, stopBot } = require("./bot/discord");

process.on("SIGINT", () => {
  /*mongoose.connection.close(function () {
    console.log("Mongoose disconnected on app termination");
    process.exit(0);
  });*/
  stopBot();
});

connect()
  .then(() => {
    startBot();
  })
  .catch((e) => console.error(e));
