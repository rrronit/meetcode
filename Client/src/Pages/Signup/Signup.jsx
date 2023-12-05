import React, { useEffect } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PasswordChecker from "../../Component/PasswordChecker/PasswordChecker";

const Signup = () => {
  const Navigate = useNavigate();

  const signupSchema = Yup.object({
    username: Yup.string().min(3).max(16).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(20).required(),
  });


  useEffect(()=>{
    axios({
      method: "get",
      url: `https://meetcode.ronit.live/user/verifyuser`,
      withCredentials: true,
    })
      .then((res) => {
        Navigate("/");
      })
      
  })
  const { values, handleSubmit, handleChange, isLoading,errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
		console.log(values)
      await axios({
        method: "post",
        url:  `https://meetcode.ronit.live/user/signup`,
       data:{...values},
        withCredentials: true,
      })
        .then((data) => {
          Navigate("/signup/verify", { state: { email: values.email } });
        })
        .catch((err) => {
		      toast("Failed to Register")

          
		
        });
    },
  });

  return (
    <div className="h-screen overflow-hidden bg-black">
      <Navbar show={false} />
      <div className="form-wrapper flex justify-center items-center mt-20 md:mt-20 lg:mt-20  lg:scale-110 scale-95">
        <div className="form-container ">
          <p className="title">Signup</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                id="username"
                placeholder=""
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            <div className="input-group relative">
        
              <label htmlFor="password">Password</label>
              <PasswordChecker password={values.password}/>
          
              <input
                value={values.password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder=""
              />
            </div>
            <button className="sign mt-6 bg-blue-500" type="submit">Signup</button>
          </form>
          <div className="social-message"></div>

          <p className="signup">
            Already have an account?{" "}
            <Link to={"../login"} className=" font-light  text-xs">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
