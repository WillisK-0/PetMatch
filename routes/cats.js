let express = require("express");
let router = express.Router();
let makeCall = require("./getAnimals");
const getAuth = require("../APIfunctions/getAuth");
const getPets = require("../APIfunctions/getPets");

router.get("/", (req, res) => {
  getAuth((newToken) => {
    req.session.tokenType = newToken.tokenType;
    req.session.token = newToken.token;
    getPets(newToken.token, newToken.tokenType, (data) => {
      res.render("cats", data);
    });
  });
});

router.post("/cats", (req, res) => {
  let id = req.body.id;
  let organization_id = req.body.organization_id;
  let name = name;

  let pet = { petID: id, organization_id: organization_id, petName: name };

  pets.push(pet);

  res.render("cats", { petID: id });
});

module.exports = router;
