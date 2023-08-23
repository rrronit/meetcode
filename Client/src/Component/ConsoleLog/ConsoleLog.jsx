import React from "react";

const ConsoleLog = ({ Loading, show, data }) => {
  return (
    <div
      className={`${
        show ? " h-2/4 bottom-14" : "-bottom-96 "
      } flex-col flex  consoleLog bg-neutral-800 transition-all rounded-t-lg   w-full z-40  absolute`}
    >
      <div>
        <h1 className="p-2 bg-neutral-600 rounded-t-lg w-full">
          Result : {data ?  data.success ?  "Success": "Failed" :"" }
        </h1>
        {Loading ? (
          <p className=" w-4/6 p-4 text-lg">Loading....</p>
        ) : data ? (
          data.errorType === "Assertion" ? (
            <div>
              <p className="px-3 mt-2">Input</p>
              <div className="w-11/12 m-auto bg-neutral-600 h-10 p-1">
                {data.testcase}
              </div>
              <p className="px-3 mt-2">Output</p>
              <div className="w-11/12 m-auto h-10 p-1 bg-neutral-600  ">
                {data.output}
              </div>

              <p className="px-3 mt-2">Expected</p>
              <div className="w-11/12 m-auto h-10 p-1 bg-neutral-600 ">
                {data.expected}
              </div>
            </div>
          ) : (
            <div className="flex  items-center w-4/6 p-4 text-lg">
              {" "}
              {data.stdout}
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-2/4  ">
            <p>You must run your code first</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsoleLog;
