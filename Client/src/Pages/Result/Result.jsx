import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import { useNavigate, useLocation, Link} from "react-router-dom";
import socket from "../../Component/Component/Socket";


const Result = () => {
  const location = useLocation();
  const Navigate=useNavigate();

  const [User, setUser] = useState(location.state?.User);
  const [opponent, setOpponent] = useState({Name:location.state?.Opponent});
  

  useEffect(() => {
   
    if (!User){
      Navigate("/")
    }
        
    socket.on("Score",(players)=>{
        const tempUser=players[0].Email===User.Email ? players[0] : players[1]
        const tempOppo=players[0].Email!==User.Email ? players[0] : players[1]
        console.log("User:"+tempUser)
        console.log("Oppo:"+tempOppo)

        setUser(tempUser)
        setOpponent(tempOppo)
       
    })
 
  }, [])

  return (
    <div className="waitingScreen ">
      <div className="h-screen w-screen   overflow-hidden bg-black absolute -z-10">
        <Navbar show={true} user={User} />
        <div className="playerInfo scale-50 md:scale-90 h-3/5 flex justify-center mt-8 text-white gap-5 md:gap-32">
          <div className="yourArea  p-8 bg-neutral-950 m-2">
     
            <p className=" text-2xl lg:text-5xl w-80 h-16  relative top-10">
              {User ? User.Name : ""}
            </p>
            <p className=" text-xl lg:text-4xl w-80 h-16  relative top-16"> {User?.score ? "Your Score: "+User.score : ""}</p>
         

            {opponent.score !== undefined && User.score !== undefined && User.score>opponent.score ? (
              <p className=" text-green-600 font-bold text-6xl absolute bottom-32">
                WINNER
              </p>
            ) : (
              ""
            )}
          </div>

          <p className="timer absolute text-8xl h-96 flex justify-center items-center ">
            {" "}
          </p>
          {opponent?.score !== undefined && User?.score !== undefined && User.score===opponent.score ? (
              <p className=" font-bold text-6xl absolute bottom-32">
                DRAW
              </p>
            ) : (
              ""
            )}
          <div className="opponentArea p-8 bg-neutral-950 m-2">
       
            <p className=" text-2xl lg:text-5xl w-80  h-16  relative top-10">
              {opponent ? opponent.Name: "Waiting for opponent..."}
            </p>
            <p className=" text-xl lg:text-4xl w-80  h-16  relative top-16">{opponent?.score!==undefined ? "Opponent Score: "+opponent?.score : ""}</p>
        
            {opponent?.score !== undefined && User?.score !== undefined && User?.score<opponent.score ? (
              <p className=" text-green-600 font-bold text-6xl absolute bottom-32">
                WINNER
              </p>
            ) : User?.score!==undefined && opponent?.score===undefined? (
              <p className="font-bold text-2xl absolute bottom-32">
             Playing
              </p>):
              ""
            }
          </div>
          </div>
          <div className="flex justify-center items-center w-full">
          <Link to={"/"} className=" bg-blue-500 text-white text-center py-3 px-6 rounded-md shadow-md font-bold hover:bg-blue-700 transition duration-300 w-5/12 lg:w-3/12">Home</Link>
          </div>
      </div>
    </div>
  );
};

export default Result;
