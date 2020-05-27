const org = "RI77";
const status = "adoptable";
const fetch = require("node-fetch");
const key = "fzJGFxrKg3dAbPMgK8AYlsmtK2rKB27lAzmG0hR8ROxJnBro39";
const secret = "nEBZNLBFzxdlaSNkPNrDafLKKrREtKhSLan6OeRC";
let data = {};

// Call the API
fetch("https://api.petfinder.com/v2/oauth2/token", {
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
  .then(function (data_returned) {
    data = data_returned;
    console.log("token", data);

    //Return second API call using token
    return fetch(
      "https://api.petfinder.com/v2/animals?organization=" +
        org +
        "&status=" +
        status,
      {
        headers: {
          Authorization: data.token_type + " " + data.access_token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
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
