let express = require("express");
let router = express.Router();
let makeCall = require("./getAnimals");
const getAuth = require("../APIfunctions/getAuth");
const getPets = require("../APIfunctions/getPets");
// get the api call to pull the pets info before the mustache page renders
router.get("/", (req, res) => {
  getAuth((newToken) => {
    req.session.tokenType = newToken.tokenType;
    req.session.token = newToken.token;
    getPets(newToken.token, newToken.tokenType, (data) => {
      res.render("houstonPets", data);
    });
  });
});

router.post("/houstonPets", (req, res) => {
  let id = req.body.id;
  let organization_id = req.body.organization_id;
  let name = name;

  let pet = { petID: id, organization_id: organization_id, petName: name };

  pets.push(pet);

  res.render("houstonPets", { petID: id });
});

module.exports = router;
