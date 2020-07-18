const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
//TODO currently experimenting with password not being required to help out with updating the favoritted ice cream
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 200,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  favorites: {
    type: Array,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
      favorites: this.favorites,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email().min(5).max(255),
    password: Joi.string().min(5).max(255),
    isAdmin: Joi.boolean(),
    favorites: Joi.array().items(Joi.string()),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
