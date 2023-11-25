import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const Navbar = ({ show, user }) => {
  
  const [screenWidth, setScreenWidth] = useState(screen.width);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(screen.width);
    });
  }, []);
  const handleClick = async () => {
    await axios
      .get(`https://meetcode.ronit.live/user/continueasguest`,{withCredentials:true})
      .then((res) =>  window.location.reload())
      .catch((err) => console.log(err));
  };
  const handleLogout=async()=>{
    await axios
    .get(`https://meetcode.ronit.live/user/logout`,{withCredentials:true})
    .then((res) =>  window.location.reload())
    .catch((err) => console.log(err));
};

  return (
    <div>
      <div className="navbar-container flex justify-between items-center mx-5 md:mx-10 mt-3">
        <div className="logo ">
          <a href={`..`}>
            <img className=" h-16 md:h-24 lg:h-24" src={logo} alt="logo" />
          </a>
        </div>
        <div className="menu-container ">
          {user ? (
            <ul className="flex gap-4">
              <button onClick={handleLogout}>
                <li className="card">{user.Name}</li>
              </button>
            </ul>
          ) : show ? (
            screenWidth > 550 ? (
              <ul className="flex gap-4 items-center">
                <Link to="login">
                  <li className="card">Log in</li>
                </Link>
                <Link to="signup">
                  <li className="card">Sign up</li>
                </Link>
                <button onClick={handleClick}>
                  <li className="card">Continue as guest</li>
                </button>
              </ul>
            ) : (
              <ul>
                <Link to="login">
                  <li className="card">Log in</li>
                </Link>
              </ul>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
