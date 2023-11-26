import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Verification from "./Pages/OTPverification/Verification";
import WaitingScreen from "./Pages/Waiting sceen/WaitingScreen";
import ProblemScreen from "./Pages/ProblemScreen/ProblemScreen";

import AddProblemForm from "./AddProblemForm";
import Result from "./Pages/Result/Result";
import Forgetpass from "./Pages/Forgetpass/Forgetpass";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signup/verify" element={<Verification/>}/>
        <Route path="/forgetpass" element={<Forgetpass/>} />
        <Route path="/:roomID" element={<WaitingScreen/>} />
        <Route path="/:roomID/:problemID" element={<ProblemScreen/>} />
        <Route path="/:roomID/result" element={<Result/>} />
        <Route path="/addprob" element={<AddProblemForm/>} />
        
      
        

      </Routes>
    </>
  );
}

export default App;
