const express = require("express");
const router = express();
const session = require("express-session");
const getAuth = require("../APIfunctions/getAuth");
const getPets = require("../APIfunctions/getPets");

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
  getAuth((newToken) => {
    req.session.tokenType = newToken.tokenType;
    req.session.token = newToken.token;
    getPets(newToken.token, newToken.tokenType, (data) => {
      res.render("petDetails", data);
    });
  });
});

router.get("/pet-details/:id", (req, res) => {
  let petId = req.params.id;
  res.render("petDetails", { petId: petId });
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

router.post("/find-match", (req, res) => {
  let q1 = req.body.catDog;
  let q2 = req.body.indoorOutdoor;
  let q3 = req.body.sml;
  let q4 = req.body.checks;
  console.log(q1);
  console.log(q2);
  console.log(q3);
  console.log(q4);
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
