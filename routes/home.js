const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/pet-details", (req, res) => {
  res.render("petDetails");
});

module.exports = router;
