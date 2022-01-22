const router = require("express").Router();
const { carDetalesController } = require("../Controllers/carDetailsController");

router.route("/details").get(carDetalesController);

module.exports = router;
