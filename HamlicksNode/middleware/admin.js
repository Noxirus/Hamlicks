//This checks if the users account is admin
module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
