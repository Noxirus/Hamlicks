const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Flavour, validate } = require("../models/flavour");
const { Type } = require("../models/type");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//Get request for flavours
router.get("/", async (req, res, next) => {
  const flavours = await Flavour.find().sort("name");
  res.send(flavours);
});

//Post a new flavour into the database
//auth will run the authorization, make sure the token is correctly on the user
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send("Invalid Type.");

  let flavour = new Flavour({
    name: req.body.name,
    type: { _id: type._id, name: type.name },
    description: req.body.description,
    cost: req.body.cost,
    licks: req.body.licks,
    picture: req.body.picture,
  });

  flavour = await flavour.save();
  res.send(flavour);
});

//Update a flavour in the DB
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send("Invalid Type.");

  const flavour = await Flavour.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      type: { _id: type._id, name: type.name },
      description: req.body.description,
      cost: req.body.cost,
      licks: req.body.licks,
      likes: req.body.likes,
      picture: req.body.picture,
    },
    {
      new: true,
    }
  );

  if (!flavour) return res.status(404).send("Not found");

  res.send(flavour);
});

//Delete a flavour
router.delete("/:id", [auth, admin], async (req, res) => {
  const flavour = await Flavour.findByIdAndDelete(req.params.id);

  if (!flavour) return res.status(404).send("Not found");

  res.send(flavour);
});

//Get a single flavour
router.get("/:id", validateObjectId, async (req, res) => {
  const flavour = await Flavour.findById(req.params.id);

  if (!flavour) return res.status(404).send("Not found");
  res.send(flavour);
});

module.exports = router;
