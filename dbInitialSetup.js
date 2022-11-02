const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

mongoose.connect(MONGO_CONNECTION);
mongoose.connection
  .once("open", () => console.log("Conexión con la base de datos establecida"))
  .on("error", (error) => console.log(error));

async function dbInitialSetup() {
  await require("./seeders/userSeeder")();

  await require("./seeders/tweetSeeder")();

}

module.exports = {
  mongoose,
  Schema,
  dbInitialSetup,
};
