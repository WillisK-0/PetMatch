let express = require("express");
let router = express.Router();
// let  = require("./sortByBreed");

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
};

router.get("/sortByBreed", (req, res) => {
  getPets((response) => {
    // console.log(JSON.stringify(response.animals[0].name));
    // console.log(response.animals[0].photos);
    // console.log(response.animals[1]._links);
    let petInfo = { pets: response.animals.breeds };
    res.render("houstonPets", petInfo);
  });
});

module.exports = router;
