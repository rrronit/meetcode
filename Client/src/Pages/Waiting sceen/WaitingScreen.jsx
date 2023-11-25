import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import "./WaitingScreen.css";
import axios from "axios";
import ShareLink from "../../Component/ShareLInk/ShareLink";
import socket from "../../Component/Component/Socket";
import {validate} from "uuid"

const WaitingScreen = () => {
  const location = useLocation(); /*  */
  const from = location.state?.from || "joining";
  const makingFriend = location.state?.makingFriend;
  const Navigate = useNavigate();


 


  const [User, setUser] = useState(null);
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
 
    if (!validate(window.location.pathname.replace("/",""))){
      Navigate("/")
    }
    axios({
      method: "get",
      url: `https://meetcode.ronit.live/user/verifyuser`,
      withCredentials: true,
    })
      .then((res) => {
        const data = res.data.user;
        data.roomID = window.location.pathname.replace("/", "");
        setUser(data);
      })
      .catch((err) => {
        const id = window.location.pathname;

        Navigate("/login", { state: { roomID: id, from } });
      });
  }, [from]);
 
  
  useEffect(() => {
    if (User) {
      
      socket.on("connect", () => {});
      if (from === "friend" || from === "joining") {
        socket.emit("friend:joinRoom", User);
        socket.on("playersInfo", (info) => {
          const other =
            info.player1 === User.Name ? info.player2 : info.player1;
            
            setOpponent(other);
          
        });
      } else if (from === "random") {
        socket.emit("random:joinRoom", User);
        socket.on("matched", (roomID) => {
          Navigate("/" + roomID, {
            state: { from: "friend", makingFriend: true },
          });
        });
      }
    }
  }, [User]);


  useEffect(() => {
    let timer;
    
    if (User) {
      socket.on("startGame", (problem) => {
        let value = 5;

        timer = setInterval(async () => {
          document.querySelector(".timer").innerText = value;
          if (value === 0) {
            Navigate(`${location.pathname}/${problem}`, { state: { User,Opponent:opponent}});
            document.querySelector(".timer").innerText = "";
            clearInterval(timer);
            
                    }
          value--;
        }, 1000);
      });
      
    }

    return () => {
      clearInterval(timer);
    };
  }, [opponent]);

  return (
    <div className="waitingScreen ">
      <div className="h-screen w-screen   overflow-hidden bg-black absolute -z-10">
        <Navbar show={false} user={User} />
        <div className="playerInfo scale-50 md:scale-90 h-3/5 flex justify-center mt-8 text-white gap-5 md:gap-32">
          <div className="yourArea  p-8 bg-neutral-950 m-2">
     
            <p className=" text-2xl lg:text-5xl w-80 h-16  relative top-10">
              {User ? User.Name : ""}
            </p>
          
         

           
          </div>

          <p className="timer absolute text-8xl h-96 flex justify-center items-center ">
            {" "}
          </p>
         
          <div className="opponentArea p-8 bg-neutral-950 m-2">
       
            <p className=" text-2xl lg:text-5xl w-80  h-16  relative top-10">
              {opponent ? opponent : "Waiting for opponent..."}
            </p>
           
          </div>
        </div>
        {from === "friend" && !makingFriend ? <ShareLink /> : null}
      </div>
    </div>
  );
};

export default WaitingScreen;
