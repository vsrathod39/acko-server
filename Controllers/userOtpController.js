const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");
// const https = require('https');

const { User } = require("../Models/userOtpSchema");
const { Otp } = require("../Models/otpSchema");

module.exports.genOtpController = async (req, res) => {
  const user = await User.findOne({
    number: req.body.number,
  });
  if (user) return res.status(400).send("user already registered!");
  const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    alphabets: false,
    specialChars: false,
  });
  const number = req.body.number;
  console.log(OTP);
  await axios.get(
    `https://2factor.in/API/V1/${process.env.OTP_GATEWAY_KEY}/SMS/${number}/${OTP}/otpacko`
  );
  // .then((response) => {})
  // .catch((error) => {});
  const otp = new Otp({ number: number, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  const result = await otp.save();
  return res.status(200).send("Otp sen successfully!");
};

module.exports.verifyOtpController = async (req, res) => {
  const otpHolder = await Otp.find({ number: req.body.number });
  if (otpHolder.length === 0) return res.status(400).send("OTP expired");
  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validateOtp = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
  if (rightOtpFind.number === req.body.number && validateOtp) {
    const user = new User(_.pick(req.body, ["number"]));
    const token = user.generateJWT();
    const result = await user.save();
    const OTPDelete = await Otp.deleteMany({
      number: rightOtpFind.number,
    });
    return res.status(200).send({
      message: "User registration succesfull!",
      token: token,
      data: result,
    });
  } else {
    return res.status(400).send("Your otp in invalid!");
  }
};
