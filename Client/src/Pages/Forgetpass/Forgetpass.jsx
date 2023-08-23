import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

const Forgetpass = () => {
  const { values, handleSubmit, handleChange, isLoading, errors } = useFormik({
    initialValues: {
      email: ""
    },

    onSubmit: async (values) => {
      await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASEURL}/user/forgetpass`,
        data: { ...values },
        withCredentials: true,
      })
        .then((data) => {
         console.log(data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const handleGuest = async () => {
    await axios
      .get("http://localhost:4000/user/continueasguest", {
        withCredentials: true,
      })
      .then((res) => {
        if (from == "friend") {
          Navigate(to, { state: { from: "friend" } });
        } else {
          Navigate(to, { state: { from: "random" } });
        }
      });
  };

  return (
    <div className="h-screen overflow-hidden bg-black">
      <Navbar show={false} />
      <div className="form-wrapper flex justify-center items-center mt-20 lg:scale-110   scale-95">
        <div className="form-container ">
          <p className="title">Forget Password</p>
          <form className="form" onClick={handleSubmit}>
            <div className="input-group mb-8">
              <label htmlFor="username">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder=""
              />
            </div>

            <button type="submit" className="sign bg-blue-600">
              Send OTP
            </button>
          </form>
          <div className="social-message">
            <div className="line"></div>
          </div>

          <p className="signup mt-2">
            <Link to={"../login"} className=" font-light  text-xs">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgetpass;
