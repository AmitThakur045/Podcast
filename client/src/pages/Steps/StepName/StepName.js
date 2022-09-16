import React from 'react'

const StepName = ({ onClick }) => {
  return (
    <>
      <div>Step Name</div>
      <button onClick={onClick}>Next</button>
    </>
  )
}

export default StepName