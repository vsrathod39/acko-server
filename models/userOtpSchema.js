const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userOtpSchema = Schema(
  {
    number: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userOtpSchema.methods.generateJWT = () => {
  const token = jwt.sign(
    {
      _id: this.id,
      number: this.number,
    },
    process.env.JWT_SECRETKEY,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

module.exports.User = model("OTPAUTH", userOtpSchema);
