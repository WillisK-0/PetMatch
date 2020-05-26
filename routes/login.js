const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const models = require("../models");

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  let userName = req.body.userName;
  let passWord = bcrypt.hashSync(req.body.passWord, 10);

  let user = models.User.build({
    username: userName,
    password: passWord,
  });
  user.save().then((savedUser) => {
    res.redirect("/log-in");
  });
});

module.exports = router;
