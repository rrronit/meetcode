import React from 'react'

const Example = ({number,input,output,explanation}) => {
  return (
      <div>
      <p className='mb-3 font-bold'>Example {number}:</p>
    <div className=' rounded-lg text-sm p-6 bg-neutral-800'>
    <p><b className='font-semibold '>Input: </b>{input}</p>
    <p><b className='font-semibold '>Output: </b>{output}</p>
    {explanation ? <p><b className='font-semibold '>Explanation: </b>{explanation}</p>
  : ""}

    </div>
    </div>
  )
}

export default Example