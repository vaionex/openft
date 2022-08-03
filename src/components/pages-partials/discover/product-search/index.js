import Searchbar from '@/components/shared/searchbar'
import SvgFilterIcon from '@/components/common/icons/filter-icon'

import React from 'react'

const ProductSearchSection = () => {
  return (
    <div class="flex items-center my-4">
      <Searchbar />
      <button class="p-2.5 ml-2 text-sm font-medium text-gray-700 flex items-center w-max gap-2 rounded-lg border">
        <SvgFilterIcon />
        <span className="w-max">More filters</span>
      </button>
    </div>
  )
}

export default ProductSearchSection
