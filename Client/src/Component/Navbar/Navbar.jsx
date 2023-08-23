import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.png";
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
      .get("http://localhost:4000/user/continueasguest",{withCredentials:true})
      .then((res) =>  window.location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="navbar-container flex justify-between items-center mx-5 md:mx-10 mt-3">
        <div className="logo ">
          <Link to={`..`}>
            <img className=" h-16 md:h-24 lg:h-24" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="menu-container ">
          {user ? (
            <ul className="flex gap-4">
              <Link to={`${user.Name}`}>
                <li className="card">{user.Name}</li>
              </Link>
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
