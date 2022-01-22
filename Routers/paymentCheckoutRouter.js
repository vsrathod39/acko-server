const router = require("express").Router();
const {
  paymentCheckoutController,
} = require("../Controllers/paymentCheckoutController");

router.route("/checkout").post(paymentCheckoutController);

module.exports = router;
