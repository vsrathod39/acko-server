const router = require("express").Router();
const {
  genOtpController,
  verifyOtpController,
} = require("../Controllers/userOtpController");

router.route("/genotp").post(genOtpController);
router.route("/verifyotp").post(verifyOtpController);

module.exports = router;
