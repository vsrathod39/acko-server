// const dotenv = require("dotenv");
const express = require("express");
// dotenv.config({ path: "./config.env" });
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());

const otpRouter = require("./Routers/otpRouter");
const userRegistrationRouter = require("./Routers/userRegistrationRouter");
const carDetailsRouter = require("./Routers/carDetailsRouter");
const carPicRouter = require("./Routers/carPicRouter");
const paymentCheckoutRouter = require("./Routers/paymentCheckoutRouter");

app.use("/", home);
app.use("/signup", otpRouter);
app.use("/user", userRegistrationRouter);
app.use("/cars", carDetailsRouter);
app.use("/car", carPicRouter);
app.use("/payment", paymentCheckoutRouter);

module.exports = app;
