const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carNumber: { type: String, required: true },
  company: { type: String, required: true },
  title: { type: String, required: true },
  model: { type: String, required: true },
  engineCapacity: { type: Number, required: true },
  registrationData: { type: String, required: true },
  image: { type: String, required: true },
});

const Cars = mongoose.model("CARS", carSchema);
module.exports = Cars;

// 61e7c8e6c729b19294d84faa
