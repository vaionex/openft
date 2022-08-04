import TabButton from '@/components/shared/tab-button'
import { BUY_NOW, ON_AUCTION } from '@/utils/constants'
import React, { useEffect, useState } from 'react'

const FilterSection = ({
  minPrice,
  maxPrice,
  handleApplyFilters,
  productSellingType,
  handleProductSellingType,
}) => {
  const clearFilter = () => {
    minPrice.current.value = null
    maxPrice.current.value = null
    handleApplyFilters()
  }

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="border rounded-lg bg-blue-25 border-blue-100 p-4 flex flex-col gap-4">
        <TabButton
          onClick={() => handleProductSellingType(BUY_NOW)}
          text={'Buy now'}
          isActive={productSellingType === BUY_NOW}
        />
        <TabButton
          onClick={() => handleProductSellingType(ON_AUCTION)}
          text={'On auction'}
          isActive={productSellingType === ON_AUCTION}
        />
      </div>
      <div>
        <p className="text-gray-700 text-sm font-medium mb-2">Price (BSV)</p>
        <div className="flex gap-4">
          <input
            type="text"
            id="simple-search"
            className="border rounded-lg border-gray-300 text-gray-500 text-sm rounded-lgblock w-full p-2.5"
            placeholder="Min price"
            ref={minPrice}
          />
          <input
            type="text"
            id="simple-search"
            className="border rounded-lg border-gray-300 text-gray-500 text-sm rounded-lgblock w-full p-2.5"
            placeholder="Max price"
            ref={maxPrice}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="border rounded-lg border-gray-300 text-gray-500 text-sm rounded-lgblock p-2.5 w-1/3"
          onClick={clearFilter}
        >
          Clear
        </button>
        <button
          className="border rounded-lg bg-blue-600 text-white text-sm rounded-lgblock p-2.5 w-2/3"
          onClick={handleApplyFilters}
        >
          Apply filter
        </button>
      </div>
    </div>
  )
}

export default FilterSection
