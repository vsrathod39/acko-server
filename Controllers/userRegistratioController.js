const User = require("../models/userSchema");

// user registration
module.exports.userRegistration = (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(422).send("please fill the feild properly");
  }
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).send("email already exist");
      }
      const user = new User({ name, email, phone, password });
      user
        .save()
        .then(() => {
          return res.status(201).send("user registered successfuly");
        })
        .catch(() => {
          return res.status(500).json("failed to register");
        });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
