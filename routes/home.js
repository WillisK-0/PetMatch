const express = require("express");
const router = express();
const session = require("express-session");

router.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

router.get("/", (req, res) => {
  let user = req.session.user;

  res.render("home", user);
});

router.get("/pet-details", (req, res) => {
  res.render("petDetails");
});

router.get("/user", (req, res) => {
  let user = req.session.user;
  res.render("user", user);
});

module.exports = router;
