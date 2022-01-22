const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then((res) => {
    console.log("Acko Database connected");
  })
  .catch((err) => {
    console.log("Acko Database connection failed");
  });
