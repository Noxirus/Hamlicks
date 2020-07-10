const express = require("express");
const helmet = require("helmet");
const flavours = require("../routes/flavours");
const types = require("../routes/types");
const customers = require("../routes/customers");
const users = require("../routes/users");
const basic = require("../routes/basic");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const logger = require("../middleware/logger");
const authenticate = require("../authenticator");

//TODO make a merchandise model and route
//T shirts, ice cream containers, plush toys?! Hoodies with pig ears?!
//Use fawn to simulate two phase commits (transactions)

module.exports = function (app) {
  //Middleware functions
  //TODO may need to look into this more as I am not entirely sure what sort of access this gives (security concern?)
  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
    response.header("Access-Control-Allow-Methods", "*");
    next();
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); //key=value&key=value
  //This is static content that can be shared, just reference the file name in the URL (no need to reference the public directory)
  app.use(express.static("public"));
  app.use(helmet());
  app.use("/api/flavours", flavours);
  app.use("/api/types", types);
  app.use("/api/customers", customers);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/", basic);
  //middleware function
  app.use(logger);
  //authenticating
  app.use(authenticate);
  //Next middleware function after the ones above, if there is an error this will trigger
  app.use(error);
};
