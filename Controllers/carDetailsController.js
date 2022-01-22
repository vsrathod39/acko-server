const Cars = require("../Models/carDetailsSchema");

module.exports.carDetalesController = (req, res) => {
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
};
