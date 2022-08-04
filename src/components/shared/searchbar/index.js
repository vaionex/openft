import SvgSearchIcon from '@/components/common/icons/search-icon'
import React from 'react'

const Searchbar = ({ searchTerm, handleApplyFilters }) => {
  return (
    <div className="w-full flex">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <SvgSearchIcon />
        </div>
        <input
          type="text"
          id="simple-search"
          className="border rounded-lg border-gray-300 text-gray-500 text-sm rounded-lgblock w-full pl-10 p-2.5"
          placeholder="Search"
          ref={searchTerm}
        />
      </div>
      <button
        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-600 hover:bg-blue-700 "
        onClick={handleApplyFilters}
      >
        <SvgSearchIcon color={'white'} />

        <span className="sr-only">Search</span>
      </button>
    </div>
  )
}

export default Searchbar
