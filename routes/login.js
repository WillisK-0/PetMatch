const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const models = require("../models");

router.get("/", (req, res) => {
  res.render("login");
});
// user sign in and password authentication
router.post("/", (req, res) => {
  let userName = req.body.userName;
  let passWord = req.body.userName;

  if (req.session) {
    req.session.user = userName;
  }

  models.User.findOne({
    where: {
      username: userName,
    },
  }).then((user) => {
    if (user == null) {
      res.render("login", { message: "Username does not exist" });
    } else {
      if (bcrypt.compare(passWord, user.password)) {
        res.redirect("/home");
      } else {
        res.render("login", { message: "Username or password is incorrect." });
      }
    }
  });
});
// registering a new user
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  let userName = req.body.userName;
  let passWord = bcrypt.hashSync(req.body.passWord, 10);

  models.User.findOne({
    where: {
      username: userName,
    },
  }).then((user) => {
    if (user == null) {
      let newUser = models.User.build({
        username: userName,
        password: passWord,
      });
      newUser.save().then((savedUser) => {
        res.redirect("/log-in");
      });
    } else {
      res.render("register", { message: "Username already exists" });
    }
  });
});

function authenticate(req, res, next) {
  console.log("AUTHENTICATE");
}

module.exports = router;
