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

let getPets = function () {
  return fetch("https://api.petfinder.com/v2/animals?location=Houston, TX", {
    headers: {
      Authorization: tokenType + " " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log("pets", data);
    })
    .catch(function (err) {
      console.log("something went wrong", err);
    });
};

//-------------------------

//validate token and fetch pets
let makeCall = function () {
  if (!expires || expires - new Date().getTime() < 1) {
    console.log("new call");
    getOAuth().then(function () {
      getPets();
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

makeCall();
