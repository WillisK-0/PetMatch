const express = require("express");
const router = express();

router.get("/", (req, res) => {
  let user = req.session.user;

  res.render("home", user);
});

router.get("/pet-details", (req, res) => {
  res.render("petDetails");
});

module.exports = router;
