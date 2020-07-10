const winston = require("winston"); //This is used for logging errors
//require("winston-mongodb"); //This may not work with jest
require("express-async-errors"); //TODO you will need to check if this worked or not

module.exports = function () {
  //Catching an uncaught excpetion and logging it to a logfile
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  //if there is an unhandled Rejection, throw it as an exception for winston to catch
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  //Error logging
  winston.add(
    new winston.transports.File({ filename: "logfile.log", level: "error" })
  );
  /* This may not work with jest so commenting out
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/hamlicks",
      level: "error",
    })
  );
  */
  winston.add(new winston.transports.Console());
};
