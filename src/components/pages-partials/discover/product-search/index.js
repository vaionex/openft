import Searchbar from '@/components/shared/searchbar'
import SvgFilterIcon from '@/components/common/icons/filter-icon'

import React, { useRef } from 'react'

const ProductSearchSection = ({ searchTerm, handleApplyFilters }) => {
  return (
    <div className="flex items-center my-4">
      <Searchbar
        searchTerm={searchTerm}
        handleApplyFilters={handleApplyFilters}
      />
      <button className="p-2.5 ml-2 text-sm font-medium text-gray-700 flex items-center w-max gap-2 rounded-lg border">
        <SvgFilterIcon />
        <span className="w-max">More filters</span>
      </button>
    </div>
  )
}

export default ProductSearchSection
