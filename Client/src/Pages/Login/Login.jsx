import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup"
import {useFormik} from "formik"
import axios from "axios";
import PasswordChecker from "../../Component/PasswordChecker/PasswordChecker";
import toast from 'react-hot-toast';
const Login = () => {
  const Navigate = useNavigate();
const location=useLocation()
const to=location?.state?.roomID || "/"
const from=location?.state?.from

  const loginSchema = Yup.object({
   
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(20).required(),
  });

  const { values, handleSubmit, handleChange, isLoading, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await axios({
        method: "post",
        url:`http://localhost:4000/user/login`,
        data: { ...values },
        withCredentials: true,
      })
        .then((res) => {
          
          if (from=="friend"){
            Navigate(to,{state:{from:"friend", ...res.data.user }})
          }
          else{
            Navigate(to,{state:{from:"random", ...res.data.user }})
          }
         
        })
        .catch((err) => {
          toast("Failed to login")
        });
    },
  });
  const handleGuest=async()=>{
    await axios.get("http://localhost:4000/user/continueasguest",{withCredentials:true})
      .then((res) =>  {
      if (from=="friend"){
        Navigate(to,{state:{from:"friend"}})
      }
      else{
        Navigate(to,{state:{from:"random"}})
      }
    })
      
      .catch((err) => 
      toast("Failed to login")
      );
  }

  return (
    <div className="h-screen overflow-hidden bg-black">
      <Navbar show={false} />
      <div className="form-wrapper flex justify-center items-center mt-20 lg:scale-110   scale-95">
        <div className="form-container ">
          <p className="title">Login</p>
          <form className="form" onClick={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Email</label>
              <input type="email" name="email" onChange={handleChange} value={values.email}  placeholder="john@gmail.com" />
            </div>
            <div className="input-group relative ">
            <div className="flex">
              <label htmlFor="password">Password</label>
              <PasswordChecker password={values.password}/>
              </div>
              <input
                type="password"
                name="password"
       
                placeholder="********"
                onChange={handleChange}
                value={values.password}
              />
    
              <div className="forgot">
                <Link to="/forgetPass">
                  Forgot Password ?
                </Link>
              </div>
            </div>
            <button type="submit" className="sign bg-blue-600">
              
              Log in
            </button>
          </form>
          <div className="social-message">
            <div className="line"></div>
            <p className="message mb-3 hover:underline hover:decoration-sky-600 cursor-pointer" onClick={handleGuest}>
              Continue as guest
            </p>
            <div className="line"></div>
          </div>

          <p className="signup">
            Don't have an account?{" "}
            <Link to={"../signup"} className=" font-light  text-xs">
      
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
