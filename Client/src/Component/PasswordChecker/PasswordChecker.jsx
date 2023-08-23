import React, { useEffect, useState } from "react";

const PasswordChecker = ({ password }) => {
  const [passLength, setpassLength] = useState(false);
  const [passSmall, setpassSmall] = useState(false);
  const [passCapital, setpassCapital] = useState(false);
  const [passNumber, setpassNumber] = useState(false);

  useEffect(() => {
    if (password.length > 6) {
      setpassLength(true);
    } else {
      setpassLength(false);
    }
    if (/[A-Z]/.test(password)) {
      setpassCapital(true);
    } else {
      setpassCapital(false);
    }
    if (/[1-9]/.test(password)) {
      setpassNumber(true);
    } else {
      setpassNumber(false);
    }
    if (/[a-z]/.test(password)){
      setpassSmall(true);
    } else {
      setpassSmall(false);
    }
  }, [password]);

  return (
    <div className="flex gap-2 absolute scale-90 top-2 right-2">
      <div
        className="Dots  w-3 h-3  rounded-full"

        style={
          passCapital
            ? { backgroundColor: "rgb(0, 196, 0)" }
            : { backgroundColor: "#555" }
        }

        
      ></div>
      <div
        className="Dots w-3 h-3  rounded-full"
        style={
          passSmall
            ? { backgroundColor: "rgb(0, 196, 0)" }
            : { backgroundColor: "#555" }
        }
      ></div>
      <div
        className="Dots w-3 h-3  rounded-full"
        style={
          passLength
            ? { backgroundColor: "rgb(0, 196, 0)" }
            : { backgroundColor: "#555" }
        }
      ></div>
      
      <div
        className="Dots w-3 h-3  rounded-full"
        style={
          passNumber
            ? { backgroundColor: "rgb(0, 196, 0)" }
            : { backgroundColor: "#555" }
        }
      ></div>
    </div>
  );
};

export default PasswordChecker;
