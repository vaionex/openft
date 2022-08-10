/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import PropTypes from 'prop-types'

const AddOnInput = ({ addOn, label, ...props }) => {
  return (
    <div>
      <label
        htmlFor="company-website"
        className="sr-only text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          {addOn}
        </span>
        <input
          {...props}
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
        />
      </div>
    </div>
  )
}

AddOnInput.propTypes = {
  label: PropTypes.string,
  addOn: PropTypes.string,
}
export default AddOnInput
