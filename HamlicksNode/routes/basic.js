const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Hamlicks", message: "Ice Cream" });
});

module.exports = router;
