const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please fill name"],
    },
    email: {
      type: String,
      required: [true, "please fill email"],
    },
    password: {
      type: String,
      required: [true, "please fill password"],
    },
    phone: {
      type: String,
      required: [true, "please fill Phone no."],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
