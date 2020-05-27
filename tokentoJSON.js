const fetch = require("node-fetch");
const key = "fzJGFxrKg3dAbPMgK8AYlsmtK2rKB27lAzmG0hR8ROxJnBro39";
const secret = "nEBZNLBFzxdlaSNkPNrDafLKKrREtKhSLan6OeRC";

// Call the API
// This is a POST request, because we need the API to generate a new token for us
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
    // Return the response as JSON
    return resp.json();
  })
  .then(function (data) {
    // Log the API data
    console.log("token", data);
  })
  .catch(function (err) {
    // Log any errors
    console.log("something went wrong", err);
  });
