// carPicController
const CarPic = require("../Models/carPicSchema");

// cars pic and price value
module.exports.carPicController = (req, res) => {
  if (Object.keys(req.query).length === 0) {
    CarPic.find({})
      .then((data) => {
        if (data === null) {
          return res.status(201).json({ message: "no data exist" });
        }
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(500).json({ message: "please check route", error });
      });
  }
  const { company, apiKey, model } = req.query;
  if (!(apiKey === "test5")) {
    return res.status(201).json({
      message: "please check api key",
    });
  }
  if (company && model) {
    CarPic.findOne({ $and: [{ company }, { model }] })
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
  CarPic.find({ $or: [{ company }, { model }] })
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
};
