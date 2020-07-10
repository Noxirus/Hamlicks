const winston = require("winston"); //This is used for logging errors
const mongoose = require("mongoose"); //Used for route and model handling in mongodb
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`${db} is open`));
};
