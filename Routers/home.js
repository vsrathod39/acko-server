const router = require("express").Router();

router.route("").get((req, res) => {
  return res.status(200).send("Welcome to home route!");
});

module.exports = router;
