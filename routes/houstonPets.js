let express = require("express");
let router = express.Router();
let makeCall = require("./getAnimals");

// get the api call to pull the pets info before the mustache page renders
router.get("/", (req, res) => {
  makeCall();

  res.render("houstonPets", { pets: pets });
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
