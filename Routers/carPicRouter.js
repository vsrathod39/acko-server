const router = require("express").Router();
const { carPicController } = require("../Controllers/carPicController");

router.route("/pic").get(carPicController);

module.exports = router;
