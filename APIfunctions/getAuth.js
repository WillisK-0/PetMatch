const fetch = require("node-fetch");
const key = "fzJGFxrKg3dAbPMgK8AYlsmtK2rKB27lAzmG0hR8ROxJnBro39";
const secret = "nEBZNLBFzxdlaSNkPNrDafLKKrREtKhSLan6OeRC";
let data = {};
let token, tokenType, expires;

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
      console.log(token, tokenType);

      expires = new Date().getTime() + data.expires_in * 1000;
    })
    .catch(function (err) {
      console.log("something went wrong", err);
    });
};

module.exports = getOAuth;
