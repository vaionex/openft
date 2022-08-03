import React from 'react'

const FilterSection = () => {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="border rounded-lg bg-blue-25 border-blue-100 p-4 flex gap-4">
        <button className="bg-blue-500 rounded-lg text-white w-full p-2">
          Buy now
        </button>
        <button className="text-gray-500 w-full p-2">On auction</button>
      </div>
      <div>
        <p className="text-gray-700 text-sm font-medium mb-2">Price (BSV)</p>
        <div className="flex gap-4">
          <input
            type="text"
            id="simple-search"
            class="border rounded-lg border-gray-300 text-gray-500 text-sm rounded-lgblock w-full p-2.5"
            placeholder="Any price"
          />{' '}
          <input
            type="text"
            id="simple-search"
            class="border rounded-lg border-gray-300 text-gray-500 text-sm rounded-lgblock w-full p-2.5"
            placeholder="Any price"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <button class="border rounded-lg border-gray-300 text-gray-500 text-sm rounded-lgblock p-2.5 w-1/3">
          Clear
        </button>
        <button class="border rounded-lg bg-blue-600 text-white text-sm rounded-lgblock p-2.5 w-2/3">
          Apply filter
        </button>
      </div>
    </div>
  )
}

export default FilterSection
