import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../Component/Socket";

const Timer = ({User,Opponent}) => {
  const Navigate = useNavigate();
  const [countdown, setCountdown] = useState(600);
  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        socket.emit("submit", { ...User, score });

        Navigate(`/${User.roomID}/result`, {
          state: { User: { ...User, score:0 }, Opponent },
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const formattedTime = `${Math.floor(countdown / 60)
    .toString()
    .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`;

  return (
    <div className={`text-3xl  ${countdown < 60 ? "text-red-500" : ""}`}>
      {formattedTime}
    </div>
  );
};

export default Timer;
