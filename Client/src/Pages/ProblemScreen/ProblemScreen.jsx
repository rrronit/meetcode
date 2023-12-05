import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Component/Navbar/Navbar";

import Example from "../../Component/Example/Example";
import Dropdown from "../../Component/Dropdown/Dropdown.jsx";
import "./ProblemScreen.css";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";

import "ace-builds/src-noconflict/theme-monokai";
import socket from "../../Component/Component/Socket";
import Timer from "../../Component/Timer/Timer";
import axios from "axios";
import ConsoleLog from "../../Component/ConsoleLog/ConsoleLog";
import { useLocation, useNavigate } from "react-router-dom";



const ProblemScreen = () => {
  const location=useLocation()
  const Navigate=useNavigate()
  const [code, setCode] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  const [Problem, setProblem] = useState({
    problemName: "",
    difficulty: "",
    examples: [],
    description: "",
    default: {},
  });
  

  const [showLog, setShowLog] = useState(false);
  const [InputData, setInputData] = useState("");
  const [submitLoading, setsubmitLoading] = useState(false);
  const [score, setScore] = useState(5)



  const [User, setUser] = useState(location.state?.User)

  const [Opponent, setOpponent] = useState(location.state?.Opponent)
  
 


  useEffect(() => {
    const fetchQuestion=async()=>{

    
      await axios({
        method:"post",
        url:`https://meetcode.ronit.live/problem/getId`,
      data:{problemId:window.location.hash.split("/")[2]}
      })
        .then((res) => {
          setProblem(res.data.problem);
          setCode(res.data.problem.default[selectedLanguage.toLowerCase()])
          })
        .catch((err) => {
          console.log(err);
        });
      }
      
    if (!Opponent){
      Navigate("/")
    }else{
    fetchQuestion()
  }
  }, []);

  useEffect(() => {
    setCode(Problem.default[selectedLanguage.toLowerCase()]);
  }, [selectedLanguage]);

  const ex = Example.length === 2 ? [1, 2] : [1, 2, 3];

  const handleSubmit = async () => {
    
    setShowLog(true);
    setsubmitLoading(true);
    await axios
      .post(`https://meetcode.ronit.live/problem/submit`, {
        code,
        language: selectedLanguage,
        question: Problem.problemId,
      })
      .then((res) => {
        setsubmitLoading(false);
        setInputData(res.data);
        
        socket.emit("submit",{...User,score})
   
        Navigate(`/${User.roomID}/result`,{state:{User:{...User,score},Opponent}})
      
        
      })
      .catch((err) => {
        setScore(prev=>prev===1 ? 1 : prev-1 )
        setInputData(err.response.data);
        setsubmitLoading(false);
      });   
    
    
  };


  return (
    <div className="h-screen w-screen md:overflow-hidden bg-black absolute -z-10 text-white">
      <Navbar />
      <div className="h-screen md:flex relative ">
        <div className="problemSection overflow-x-hidden rounded h-3/4 p-5 md:w-5/12 mt-3 ml-1 overflow-scroll">
        <div className=" flex items-center justify-between  "> 
        <p className=" font-bold my-3">{Problem.problemName}</p>
        <div className="flex ">
        <p>Points:</p>
        <p className=" text-white pr-5 pl-1 font-bold">{score}</p>
        </div>
        </div>
          <p className="text-green-400 m-3">{Problem.difficulty}</p>
       
          <p className="description pb-12 ">{Problem.description}</p>
   
          <div>
            {ex.map((i) => {
              return (
                <Example
                  key={i}
                  number={i}
                  input={Problem.examples[i - 1]?.input}
                  output={Problem.examples[i - 1]?.output}
                  explanation={Problem.examples[i - 1]?.explanation}
                />
              );
            })}
          </div>
        </div>
        <div className="solutionSection relative rounded h-3/4 bg-black  md:w-7/12  md:m-6 outline-none overflow-hidden">
          <Dropdown
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <div className="text-container mt-10 absolute h-96 w-full">
            <AceEditor
              mode={selectedLanguage.toLowerCase()}
              theme="monokai"
              value={code}
              onChange={setCode}
              fontSize={16}
              width="100%"
              height="400px"
              className="custom-ace-editor"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <div className="submit-section absolute  md:ml-8  bottom-0 flex w-11/12 items-center justify-between">
            <div className=" flex gap-6">
              <Timer User={User} Opponent={Opponent} Score={score} />
              <button
                className="bg-red-700 font-semibold h-10 w-28 rounded-lg "
                onClick={() => setShowLog(!showLog)}
              >
                Console{" "}
              </button>
            </div>
            <button
              disabled={InputData?.success || false}
              onClick={handleSubmit}
              className="submitBtn flex gap-1"
            >
              Submit
            </button>
          </div>
          <ConsoleLog Loading={submitLoading} show={showLog} data={InputData} />
        </div>
      </div>
    </div>
  );
};

export default ProblemScreen;
