const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const User = require("../models/userSchema");
const Cars = require("../models/carSchema");
const CarPic = require("../models/carPicSchema");

// car details
router.get("/cars/details", (req, res) => {
  const { carNumber, apiKey } = req.query;
  if (!(apiKey === "test5")) {
    return res.status(201).json({
      message: "please check api key",
    });
  }
  Cars.findOne({ carNumber })
    .then((data) => {
      if (data === null) {
        return res.status(201).json({ message: "car number does not exist" });
      }
      return res.status(201).json(data);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "please check car number", error: error });
    });
});

// cars pic and price value
router.get("/car/pic", (req, res) => {
  const { company, apiKey, model } = req.query;
  if (!(apiKey === "test5")) {
    return res.status(201).json({
      message: "please check api key",
    });
  }
  if (company === undefined && model === undefined) {
    console.log(company, model);
    CarPic.find()
      .then((data) => {
        console.log(data.length);
        if (data.length === 0) {
          return res.status(201).json({ message: "no data exist" });
        }
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json({ message: "please check route", error });
      });
  }
  if (!(company === undefined) && !(model === undefined)) {
    CarPic.findOne({ $and: [{ company }, { model }] })
      .collation({ locale: "en", strength: 2 })
      .then((data) => {
        if (data === null) {
          return res.status(201).json({ message: "car number does not exist" });
        }
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "please check company name", error: error });
      });
  }
  CarPic.find({
    $or: [{ company }, { model }],
  })
    .collation({ locale: "en", strength: 2 })

    .then((data) => {
      if (data === null) {
        return res.status(201).json({ message: "car number does not exist" });
      }
      return res.status(201).json(data);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "please check company name", error: error });
    });
});

// user registration
router.post("/user/register", (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(422).json({ error: "please fill the feild properly" });
  }
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "email already exist" });
      }
      const user = new User({ name, email, phone, password });
      user
        .save()
        .then(() => {
          return res
            .status(201)
            .json({ message: "user registered successfuly" });
        })
        .catch(() => {
          return res.status(500).json({ error: "failed to register" });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
});

module.exports = router;
