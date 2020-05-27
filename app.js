// test comment - rickelle
const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
//const PORT = process.env.PORT || 8080;

global.pets = [];

const session = require("express-session");
app.use(express.static("css"));
app.use(express.static("images"));

// session middleWare
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// const PORT = process.env.PORT || 8080;
const logInRouter = require("./routes/login");
const homeRouter = require("./routes/home");
const path = require("path");
const houstonPetsRouter = require("./routes/houstonPets");
const VIEWS_PATH = path.join(__dirname, "/views");
app.use(express.urlencoded());
app.use(express.json());

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.use("css/version-1", express.static("css"));
app.use(express.static("public"));

app.get("/houstonPets", (req, res) => {
  getPets((response) => {
    // console.log(JSON.stringify(response.animals[0].name));
    // console.log(response.animals[0].photos);
    // console.log(response.animals[1]._links);
    let petInfo = { pets: response.animals };
    res.render("houstonPets", petInfo);
  });
});

//app.use("/houstonPets", houstonPetsRouter);
// app.use("/login", logInRouter);
// app.use("/home", homeRouter);

const fetch = require("node-fetch");
const key = "fzJGFxrKg3dAbPMgK8AYlsmtK2rKB27lAzmG0hR8ROxJnBro39";
const secret = "nEBZNLBFzxdlaSNkPNrDafLKKrREtKhSLan6OeRC";
let data = {};
let token, tokenType, expires;

//Get token
//------------------

let getOAuth = function () {
  return fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body:
      "grant_type=client_credentials&client_id=" +
      key +
      "&client_secret=" +
      secret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log("token", data);

      //Store token data
      token = data.access_token;
      tokenType = data.token_type;
      expires = new Date().getTime() + data.expires_in * 1000;
    })
    .catch(function (err) {
      console.log("something went wrong", err);
    });
};

//Gets Houston, TX results
//----------------------

// function fetchWithDefaultHeaders(url) {
//   return fetch(url, {
//     headers: {
//       Authorization: tokenType + " " + token,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });
// }

// ?location=Houston, TX (params for fetch)

let getPets = function (callback) {
  fetch("https://api.petfinder.com/v2/animals?location=Houston, TX", {
    headers: {
      Authorization: tokenType + " " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.log(error));

  /*
  return (
    fetch("https://api.petfinder.com/v2/animals?location=Houston, TX", {
      headers: {
        Authorization: tokenType + " " + token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (resp) {
        return resp.json();
      })
      //printing all pets info to console
      .then(function (data) {
        callback(data);
      })
      .catch(function (err) {
        console.log("something went wrong", err);
      })
  ); */
};

//-------------------------

//validate token and fetch pets
let makeCall = function () {
  if (!expires || expires - new Date().getTime() < 1) {
    console.log("new call");
    getOAuth().then(function () {
      getPets((data) => {
        pets = data.animals;
      });
    });
    return;
  }
  //otherwise, get pets
  console.log("from cache");
  getPets();
};

// let btn = document.querySelector("#refresh");

// makeCall();
// btn.addEventListener("click", makeCall, false);

// makeCall();
// ------------------

getOAuth();

app.listen(3000, () => {
  console.log("Server is running...");
});
