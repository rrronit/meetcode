import axios from 'axios';
import React, { useState } from 'react';

const AddProblemForm = () => {
  const [problemId, setProblemId] = useState('');
  const [problemName, setProblemName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [description, setDescription] = useState('');
  const [examples, setExamples] = useState([{ input: '', output: '', explanation: '' }]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProblem = {
      problemId,
      problemName,
      difficulty,
      description,
      examples
    };
   
    await axios.post(`https://meetcode.ronit.live/problem/add`,newProblem,{withCredentials:true}).then(()=>location.reload());


    setProblemId('');
    setProblemName('');
    setDifficulty('');
    setDescription('');
    setExamples([{ input: '', output: '', explanation: '' }]);
  };

  const addExample = () => {
    setExamples([...examples, { input: '', output: '', explanation: '' }]);
  };

  const handleExampleChange = (index, field, value) => {
    const newExamples = [...examples];
    newExamples[index][field] = value;
    setExamples(newExamples);
  };

  return (
    <div className='bg-black'>
  
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 shadow-md rounded-lg bg-neutral-500" >
      <label htmlFor="problemId" className="block font-bold mb-2">Problem ID:</label>
      <input
        type="text"
        id="problemId"
        value={problemId}
        onChange={(e) => setProblemId(e.target.value)}
        required
        className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <br />
      <label htmlFor="problemName" className="block font-bold mb-2">Problem Name:</label>
      <input
        type="text"
        id="problemName"
        value={problemName}
        onChange={(e) => setProblemName(e.target.value)}
        required
        className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <br />
      <label htmlFor="difficulty" className="block font-bold mb-2">Difficulty:</label>
      <input
        type="text"
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <br />
      <label htmlFor="description" className="block font-bold mb-2">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        cols="50"
        className="w-full border rounded p-2 resize-none focus:outline-none focus:ring focus:border-blue-300"
      ></textarea>
      <br />
      <h2 className="font-bold text-lg mt-4 mb-2">Examples:</h2>
      {examples.map((example, index) => (
        <div key={index} className="mb-4">
          <label htmlFor={`input${index}`} className="block font-bold mb-1">Input:</label>
          <input
            type="text"
            name={`input${index}`}
            value={example.input}
            onChange={(e) => handleExampleChange(index, 'input', e.target.value)}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <label htmlFor={`output${index}`} className="block font-bold mb-1">Output:</label>
          <input
            type="text"
            name={`output${index}`}
            value={example.output}
            onChange={(e) => handleExampleChange(index, 'output', e.target.value)}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <label htmlFor={`explanation${index}`} className="block font-bold mb-1">Explanation:</label>
          <textarea
            name={`explanation${index}`}
            value={example.explanation}
            onChange={(e) => handleExampleChange(index, 'explanation', e.target.value)}
            rows="2"
            cols="30"
            className="w-full border rounded p-2 resize-none focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>
      ))}
      <button type="button" onClick={addExample} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Another Example
      </button>
      <br />
      <input type="submit" value="Submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded" />
    </form>
    </div>
  );
};

export default AddProblemForm;
