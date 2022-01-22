const router = require("express").Router();
const {
  userRegistration,
} = require("../Controllers/userRegistratioController");

router.route("/signup/registration").post(userRegistration);

module.exports = router;
