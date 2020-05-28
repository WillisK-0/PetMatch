let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.render("/index", { pets: pets });
});

module.exports = router;
