const winston = require("winston");
const debug = require("debug")("app:startup"); //Used for sending debug message only in certain situations (development)
const dbDebugger = require("debug")("app:db");
const morgan = require("morgan");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation");
require("./startup/prod")(app);

//set hamlicks_jwtPrivateKey="ENTER STRING HERE"
//set NODE_ENV=test
//npm test
//git add .
//git commit -m "message here"
//git push heroku master

app.set("view engine", "pug");
app.set("views", "./views");

//use when you want to know all the requests that are being made to the server

//Configuration
/*
debug("Application Name: " + config.get("name"));
debug("Mail Server: " + config.get("mail.host"));
debug("Mail Password: " + config.get("mail.password"));
*/

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan Online");
}

//Db work...
dbDebugger("Connected to the database");

// PORT
const port = process.env.PORT || 3900;
const server = app.listen(port, () =>
  winston.info(`Listening on Port: ${port}`)
);

module.exports = server;
