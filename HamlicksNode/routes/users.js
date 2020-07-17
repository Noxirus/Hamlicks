const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

//TODO look into Joi complexity for additional requirements for the password
//Get request for users
router.get("/", [auth, admin], async (req, res, next) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) return res.status(404).send("Not found");
  res.send(user);
});

//Post a new user into the database
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  user.isAdmin = false;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

//Update a user in the DB[auth, admin],
//TODO Will need to sometimes check admin if the id != the id of the user being changed?
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password !== undefined) {
    let user;
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
        favorites: req.body.favorites,
      },
      {
        new: true,
      }
    );
  } else {
    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        favorites: req.body.favorites,
      },
      {
        new: true,
      }
    );
  }

  if (!user) return res.status(404).send("Not found");
  const token = user.generateAuthToken();
  user.password = "";
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

//Delete a user
router.delete("/:id", [auth, admin], async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return res.status(404).send("Not found");

  res.send(user);
});

module.exports = router;
