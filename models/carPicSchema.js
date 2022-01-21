const mongoose = require("mongoose");

const carPicSchema = new mongoose.Schema({
  company: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
});

const CarPic = mongoose.model("CARPIC", carPicSchema);
module.exports = CarPic;

// 61e7c8e6c729b19294d84faa
