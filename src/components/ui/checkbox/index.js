import React from 'react'
import { twMerge } from 'tailwind-merge'

const Checkbox = ({ id, text, className, ...props }) => {
  return (
    <div className={twMerge('relative flex items-start', className)}>
      <div className="flex items-center h-5 ">
        <input
          id={id}
          type="checkbox"
          className="w-4 h-4 text-white rounded cursor-pointer checked:bg-center checked:border-blue-500 checked:bg-checkbox-icon checked:bg-auto focus:ring-blue-300 focus:ring-1"
          {...props}
        />
      </div>

      {text && (
        <label
          htmlFor={id}
          className="ml-2 text-sm text-gray-700 cursor-pointer"
        >
          {text}
        </label>
      )}
    </div>
  )
}

export default Checkbox
