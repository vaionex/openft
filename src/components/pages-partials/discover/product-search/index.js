import Searchbar from '@/components/shared/searchbar'
import React from 'react'

const ProductSearchSection = () => {
  return (
    <div class="flex items-center my-4">
      <Searchbar />
      <button class="p-2.5 ml-2 text-sm font-medium text-gray-700 flex items-center w-max gap-2 rounded-lg border">
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H14M1.5 1H16.5M6.5 11H11.5"
            stroke="#344054"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="w-max">More filters</span>
      </button>
    </div>
  )
}

export default ProductSearchSection
