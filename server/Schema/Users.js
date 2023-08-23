const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Enter Name"],
  },
  Email: {
    type: String,
    required: [true, "Enter Email"],
    unique: true,
  },
  Password: {
    type: String,
    required: [true, "Enter Password"],
    select:false
  },
  
  OTPVerification: {
    type: Number,
  },
  OTPExpireTime: {
    type: Date,
  },
  Verified: {
    type: Boolean,
    default: false
  },

});
UserSchema.methods.getJWTtoken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY);
};

UserSchema.methods.comparePassword =()=> async function (password) {
  return await bcrypt.compare(this.Password, password);
};


module.exports = mongoose.model("user", UserSchema);
