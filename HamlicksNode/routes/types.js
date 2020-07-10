const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Type, validate } = require("../models/type");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//Get request for types
router.get("/", async (req, res, next) => {
  const types = await Type.find().sort("name");
  res.send(types);
});

//Post a new type into the database
//auth will run the authorization, make sure the token is correctly on the user
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let type = new Type({
    name: req.body.name,
  });

  type = await type.save();
  res.send(type);
});

//Update a type in the DB
//TODO may also need to update all other aspects of the type class
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );

  if (!type) return res.status(404).send("Not found");

  res.send(type);
});

//Delete a type
router.delete("/:id", [auth, admin], async (req, res) => {
  const type = await Type.findByIdAndDelete(req.params.id);

  if (!type) return res.status(404).send("Not found");

  res.send(type);
});

//Get a single type
router.get("/:id", validateObjectId, async (req, res) => {
  const type = await Type.findById(req.params.id);

  if (!type) return res.status(404).send("Not found");
  res.send(type);
});

module.exports = router;
