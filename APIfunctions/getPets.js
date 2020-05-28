const fetch = require("node-fetch");
// const key = "fzJGFxrKg3dAbPMgK8AYlsmtK2rKB27lAzmG0hR8ROxJnBro39";
// const secret = "nEBZNLBFzxdlaSNkPNrDafLKKrREtKhSLan6OeRC";
// let data = {};
// let token, tokenType, expires;

let getPets = function (token, tokenType, callback) {
  fetch("https://api.petfinder.com/v2/animals?location=Houston, TX", {
    headers: {
      Authorization: tokenType + " " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.log(error));
};

module.exports = getPets;
