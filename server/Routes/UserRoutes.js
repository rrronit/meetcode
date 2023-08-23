const express=require("express")
const { registerUser, loginUser, logoutUser, verifyOTP, sendOTP, verifyUser, forgetPass, verifyUserAndMakeGuest, handleGuest} = require("../Controller/UserController")

const router=express.Router()

router.post("/signup",registerUser)

router.post("/login",loginUser)

router.post("/verify",verifyOTP)

router.get("/logout",logoutUser)

router.post("/forgetpass",forgetPass)

router.post("/OTPagain",sendOTP)

router.get("/verifyUser",verifyUser)

router.get("/verifyuserormakeguest",verifyUserAndMakeGuest)

router.get("/continueasguest",handleGuest)

module.exports=router