//ideally we will put in some code check to make sure people are not passing in unnecessary data
function authenticate(req, res, next) {
  console.log("authenticating");
  next();
}

module.exports = authenticate;
