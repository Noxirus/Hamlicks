function log(req, res, next) {
  console.log("Loggin");
  //needs next so that it will continue on
  next();
}

module.exports = log;
