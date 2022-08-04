import SvgSearchIcon from '@/components/common/icons/search-icon'
import React from 'react'

const Searchbar = ({ searchTerm, handleApplyFilters }) => {
  return (
    <div className="w-full flex">
      <label for="simple-search" class="sr-only">
        Search
      </label>
      <div class="relative w-full">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <SvgSearchIcon />
        </div>
        <input
          type="text"
          id="simple-search"
          class="border rounded-lg border-gray-300 text-gray-500 text-sm rounded-lgblock w-full pl-10 p-2.5"
          placeholder="Search"
          ref={searchTerm}
        />
      </div>
      <button
        class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-600 hover:bg-blue-700 "
        onClick={handleApplyFilters}
      >
        <SvgSearchIcon color={'white'} />

        <span class="sr-only">Search</span>
      </button>
    </div>
  )
}

export default Searchbar
