import React from 'react'

const TabButton = ({ text, isActive, ...props }) => {
  return (
    <button
      className={`${
        isActive ? 'bg-blue-500 rounded-lg text-white' : 'text-gray-500'
      } w-full p-2`}
      {...props}
    >
      {text}
    </button>
  )
}

export default TabButton
