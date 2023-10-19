const async_handler = require("../Middleware/async_handler");
const ErrorHandler = require("../Utils/ErrorHandler");
const Problem = require("../Schema/Problem");
const fs = require("fs");
const util = require("util");
const { exec } = require("child_process");

const execPromisified = util.promisify(exec);

exports.submitCode = async_handler(async (req, res, next) => {
  let { question, code, language } = req.body;
  if (!code || !language) {
    return next(new ErrorHandler("Invalid Submit", 301));
  }
  language = language.toLowerCase();

  let extension;

  switch (language) {
    case "python":
      extension = "py";
      break;
    case "java":
      extension = "java";
      break;
    case "c":
      extension = "c";
      break;
    case "c++":
      extension = "cpp";
      break;
  }
  const filePath = `./Container/Solution.${extension}`;
  fs.writeFileSync(filePath, code);

  fs.copyFile(
    `./TestCases/${question.toLowerCase()}.json`,
    `./Container/${question.toLowerCase()}.json`,
    (err) => {
      if (err) {
        console.log("err=>" + err);
      }
    }
  );
  
  fs.copyFile(
    `./Programs/run${language.charAt(0).toUpperCase()+language.slice(1)}/${question}.${extension}`,
    `./Container/test.${extension}`,
    (err) => {
      if (err) {
        console.log("err=>" + err);
      }
    }
  );
  try {
    const { stdout, stderr } = await executeInDocker(filePath, language);

    fs.unlink(`./Container/${question}.json`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    fs.unlink(`./Container/test.${extension}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (stderr.startsWith(".\n--")) {
      console.log("here too");
      return res.status(200).json({ success: true, stdout: "correct" });
    }
  } catch (err) {
    const error_message = err.message;

    if (error_message.includes("Test case exceeded time limit")) {
      return res
        .status(301)
        .json({ success: false, stdout: "Time Limit Exceeded" });
    } else if (error_message.includes("AssertionError")) {
      const case_start =
        err.message.indexOf("case=>", err.message.indexOf("case=>") + 1) + 6;
      const case_end = err.message.indexOf(
        "expected=>",
        err.message.indexOf("expected=>") + 1
      );

      const actual_start =
        err.message.indexOf(
          "expected=>",
          err.message.indexOf("expected=>") + 1
        ) + 10;
      const actual_end = err.message.indexOf(
        "Output",
        err.message.indexOf("Output") + 1
      );

      const result_start =
        err.message.indexOf("Output", err.message.indexOf("Output=>") + 1) + 8;
      const result_end = err.message.indexOf(
        "!!!!!",
        err.message.indexOf("!!!!!") + 1
      );

      const testcase = err.message.substring(case_start, case_end);
      const expected = err.message.substring(actual_start, actual_end);
      const output = err.message.substring(result_start, result_end);

      res.status(301).json({
        success: false,
        errorType: "Assertion",
        testcase,
        expected,
        output,
      });
    } else {
      const startsFrom = error_message.indexOf(`File "/meetcode/Solution.py"`);

      const startsEnd =
        error_message.indexOf(
          `-----`,
          error_message.indexOf("Traceback") + 1
        ) === -1
          ? error_message.length
          : error_message.indexOf(
              `-------`,
              error_message.indexOf("Traceback") + 1
            );

      const message = error_message.substring(startsFrom, startsEnd);
      console.log(message);
      res.status(301).json({ success: false, stdout: message });
    }
  }
});

const executeInDocker = async (filePath, language) => {
  const imageName = `${language}-runner`;
  console.log("here");

  const { stdout, stderr } = await execPromisified(
    `docker run --rm  -v .:/meetcode/ ${imageName}`,
    { cwd: "Container" }
  );
  

  return { stdout, stderr };
};

exports.addprob = async_handler(async (req, res, next) => {
  const prob = await Problem.create(req.body);
});

exports.getRandomProblem = async () => {
  const random = Math.floor(Math.random() * 11);
  const prob = await Problem.findOne().skip(random);
  
   return prob.problemId
};

exports.getProblem=async_handler(async(req,res,next)=>{

  const {problemId} = req.body;

  const problem=await Problem.findOne({problemId})
  if (!problem){
    return next(new ErrorHandler("Invalid Question",401))
  }
  res.status(201).json({status:true,problem})
})



const handleImage=()=>{
  
  exec("docker build -t python-runner ./Docker/python",(err)=>{
    if (err){
      console.log(err)
    }
  })
}
handleImage()
