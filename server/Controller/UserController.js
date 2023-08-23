const asyncHandler = require("../Middleware/async_handler");
const User = require("../Schema/Users");
const sendToken = require("../Utils/JWTtoken");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../Utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendOTPMail = require("../Utils/sendOTPMail");

const { v4: uuid } = require("uuid");


exports.registerUser = asyncHandler(async (req, res, next) => {

  const { username, email, password } = req.body;

  let user = await User.findOne({ Email: email.toLowerCase() });

  if (user !== null) {
    return next(new ErrorHandler("User already Exist", 400));
  }

  hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    Name: username,
    Email: email.toLowerCase(),
    Password: hashedPassword,
  });

  const OTP = Math.floor(Math.random() * 9000 + 1000);
  user.OTPVerification = OTP;
  user.OTPExpireTime = new Date(Date.now() + 600000);

  await user.save();

  try {
    await sendOTPMail(email, OTP.toString());
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
  res.json({ success: true, message: "otp sent" });
});

exports.verifyOTP = asyncHandler(async (req, res, next) => {
  const { email, OTP } = req.body;
  const user = await User.findOne({
    Email: email.toLowerCase(),
    Verified: false,
    OTPExpireTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 301));
  }
  const OTPMatched = user.OTPVerification === parseInt(OTP);
  if (!OTPMatched) {
    return next(new ErrorHandler("OTP not matched", 301));
  }

  user.Verified = true;
  user.OTPExpireTime = undefined;
  user.OTPVerification = undefined;
  await user.save();
  sendToken(user, 201, res, req);
});

exports.sendOTP = asyncHandler(async (req, res, next) => {
  const Email = req.body.email.toLowerCase();
  const OTP = Math.floor(Math.random() * 9000 + 1000);

  let user = await User.findOne({ Email: Email.toLowerCase() });

  if (!user) {
    return next(new ErrorHandler("User not found", 500));
  }

  user.OTPVerification = OTP;
  user.OTPExpireTime = new Date(Date.now() + 600000);

  await user.save();

  try {
    await sendOTPMail(Email, OTP.toString());
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
  res.json({ success: true, message: "otp sent" });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User
    .findOne({ Email: email.toLowerCase(), Verified: true })
    .select("+Password");
  if (!user) {
    return next(new ErrorHandler("Invalid User and Password", 404));
  }

  const comparePass = await bcrypt.compare(password, user.Password);

  if (!comparePass) {
    return next(new ErrorHandler("Invalid User and Password", 404));
  }
  sendToken(user, 201, res, req);
});

exports.logoutUser = asyncHandler(async (req, res, next) => {
  req.user = null;
  res
    .cookie("token", null, {
      expiresIn: Date.now(),
      httpOnly: true,
    })
    .status(201)

    .json({
      success: true,
      message: "logout successfully",
    });
});

exports.verifyUser = asyncHandler(async (req, res, next) => {
  
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("token not found", 301));
  }

  const id = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!id) {
    return next(new ErrorHandler("token is wrong", 301));
  }

  const user = await User.findById(id.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 301));
  }

  res.status(201).json({
    success: true,
    user,
  });
});


exports.forgetPass=asyncHandler(async(req,res,next)=>{
  const {email} = req.body
  console.log(email)
  res.status(201).json({mes:"done"})
  
})


exports.handleGuest=asyncHandler(async(req,res,next)=>{
  const user=await User.create({
    Name: "Guest",
    Email: uuid()+"@guest.com",
    Password: uuid(),
    Verified:true
  });

  sendToken(user, 201, res, req);
})



exports.verifyUserAndMakeGuest = asyncHandler(async (req, res, next) => {
  
  const { token } = req.cookies;
  if (!token) {
    return guestHelper(req,res)
  }

  const id = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!id) {
    return guestHelper(req,res)
  }

  const user = await User.findById(id.id);
  if (!user) {
    return guestHelper(req,res)
  }

  res.status(201).json({
    success: true,
    user,
  });
});

const guestHelper=asyncHandler(async(req,res)=>{
  const user = await User.create({
    Name: "Guest",
    Email: uuid()+"@guest.com",
    Password:uuid(),
    
  });
  res.status(201).json({success:true,
  user})

}) 


