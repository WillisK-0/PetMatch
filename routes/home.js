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

router.get("/user", authenticate, (req, res) => {
  let user = req.session.user;
  res.render("user", user);
});

router.get("/favorites", authenticate, (req, res) => {
  res.render("favorites");
});

router.get("/dogs", (req, res) => {
  res.render("dogs");
});

router.get("/find-match", (req, res) => {
  res.render("findMatch");
});

router.get("/cats", (req, res) => {
  res.render("cats");
});

function authenticate(req, res, next) {
  //   req.session.isAuthenticated = true;
  if (req.session) {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/log-in");
    }
  } else {
    res.redirect("/log-in");
  }
}
module.exports = router;
