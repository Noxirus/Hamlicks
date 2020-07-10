const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  //check to make sure the ID in the URL is valid, otherwise send a 404
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");

  next();
};
