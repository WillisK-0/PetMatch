const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const models = require("../models");
const session = require("express-session");

router.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
router.get("/", (req, res) => {
  res.render("login");
});
// user sign in and password authentication
router.post("/", (req, res) => {
  let userName = req.body.userName;
  let passWord = req.body.passWord;

  models.User.findOne({
    where: {
      username: userName,
    },
  }).then((user) => {
    if (user == null) {
      res.render("login", { message: "Username does not exist" });
    } else {
      bcrypt.compare(passWord, user.dataValues.password, (err, response) => {
        if (response) {
          console.log("passwords match");
          req.session.user = {
            user: user.dataValues.username,
            firstName: user.dataValues.firstname,
            lastName: user.dataValues.lastname,
          };
          res.redirect("/home");
        } else {
          console.log("error");
          res.render("login", { message: "Incorrect password" });
        }
      });
    }
  });
});

router.post("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/home");
});

// registering a new user
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  let userName = req.body.userName;
  let passWord = bcrypt.hashSync(req.body.passWord, 10);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  console.log(firstName);
  models.User.findOne({
    where: {
      username: userName,
    },
  }).then((user) => {
    if (user == null) {
      let newUser = models.User.build({
        username: userName,
        password: passWord,
        firstname: firstName,
        lastname: lastName,
      });
      newUser.save().then((savedUser) => {
        res.redirect("/login");
      });
    } else {
      res.render("register", { message: "Username already exists" });
    }
  });
});

function authenticate(req, res, next) {
  console.log("AUTHENTICATE");
  if (req.session) {
    if (req.session.isAuthenticated) {
      next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
}

module.exports = router;
