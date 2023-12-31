import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import "./Homepage.css";
import gsap from "gsap";
import { Link } from "react-router-dom";

import axios from "axios";
import { v4 as uuid } from "uuid";
const Homepage = () => {
  const [User, setUser] = useState(null);
  
  useEffect(() => {
    console.log(location.state)
    axios({
      method: "get",
      url: `https://meetcode.ronit.live/user/verifyuser`,
      withCredentials: true,
    })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        setUser(null);
      });
  }, [location.state]);

  const cursorRef = useRef(null);



  const handleMouseEnter=()=>{
    gsap.to(cursorRef.current,{
      scale:12,
      zIndex:-1,
   
duration:0.5


      
    })
    cursorRef.current.className+=" bg-blue-500"
  }
  const handleMouseLeave=()=>{
    gsap.to(cursorRef.current,{
      scale:1,
      zIndex:-11,
  
      duration:0.5
    })
    cursorRef.current.className="cursor"
    
  }

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursorRef.current, {
      duration: 0.8,

      top: e.pageY - 3,
      left: e.pageX - 3,
    });
  });

  return (
    <div className="homepage-container h-screen w-screen overflow-hidden absolute -z-10">
      <div>
        <Navbar show={true} user={User} />
      </div>
      <div className=" flex flex-col justify-center items-center m-20 text-white p-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 tracking-wide " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          MeetCode
        </h1>
        <p className="text-lg w-11/12 text-center opacity-60">
          Compete with other developers and solve coding challenges in a 1v1 battle.
          <br /> Prove your coding prowess
        </p>
      </div>
      <div className="btn-container mx-3 flex gap-6 justify-center items-center">
        <Link
          to={uuid()}
          state={{ from: "friend", makingFriend: false }}
          className="block bg-blue-500 text-white text-center py-4 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          COMPETE WITH FRIEND
        </Link>
        <Link
          to={uuid()}
          state={{ from: "random" }}
          className="block bg-blue-500 text-white text-center py-4 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          COMPETE WITH RANDOM
        </Link>
      </div>
      <div className="cursor" ref={cursorRef}></div>
    </div>
  );
};

export default Homepage;
