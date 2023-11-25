import React, { useEffect, useRef, useState } from "react";
import "./verification.css";
import Navbar from "../../Component/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Verification = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email || null;
  useEffect(() => {
   
    const email = location?.state?.email || null;
   
    if (!email) {
      Navigate("/signup");
    }
  }, []);

  const OTPref = useRef([]);

  const handle = async (e) => {
    e.preventDefault();
    const OTP =
      OTPref.current.children[0].value +
      OTPref.current.children[1].value +
      OTPref.current.children[2].value +
      OTPref.current.children[3].value;
 
    await axios({
      method: "post",
      url: `https://meetcode.ronit.live/user/verify`,
      data:{email,OTP} ,
      withCredentials: true,
    })
      .then((data) => Navigate(".."))
      .catch((err) => {
        console.log(err);
     
      });
  };
  const handleskip = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      e.target.value = "";
      return;
    }
    if (parseInt(e.target.id) !== 4)
      OTPref.current.children[parseInt(e.target.id)].focus();
  };

  const handleOTPagain=async()=>{
    await axios({
      method:"post",
      url: `https://meetcode.ronit.live/user/OTPagain`,
      data:{email},
    }).then(res=>console.log(res)).catch(err=>console.log(err))

  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-black absolute -z-10">
      <Navbar />
      <div className="form-wrapper flex justify-center items-center mt-32 md:mt-28 lg:mt-20  scale-150">
        <form className="otp-Form" onSubmit={(e) => handle(e)}>
          <span className="mainHeading">Enter OTP</span>
          <p className="otpSubheading">
            We have sent a verification code to your Email Address:{email}
          </p>
          <div
            className="inputContainer"
            ref={OTPref}
            onChange={(e) => handleskip(e)}
          >
            <input
              autoFocus
              required="required"
              maxLength="1"
              type="text"
              id="1"
              className="otp-input"
            />
            <input
              required="required"
              maxLength="1"
              type="text"
              className="otp-input"
              id="2"
            />
            <input
              required="required"
              maxLength="1"
              type="text"
              className="otp-input"
              id="3"
            />
            <input
              required="required"
              maxLength="1"
              type="text"
              className="otp-input"
              id="4"
            />
          </div>
          <button type="" className="verify-btn">
            {" "}
            Log in
          </button>
          <button
            onClick={() => Navigate("../signup")}
            className="exitBtn bg-white"
          >
            ×
          </button>
          <p className="resendNote">
            Didn't receive the code?{" "}
            <button onClick={handleOTPagain} className="resendBtn">Resend Code</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Verification;
