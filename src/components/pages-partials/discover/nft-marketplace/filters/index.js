import { InputMain } from '@/components/ui/inputs'
import React from 'react'

const NFTMarketplaceFilters = ({
  filterValues,
  onChange,
  onSubmit,
  clearFilters,
}) => {
  return (
    <form className="flex flex-col gap-4">
      <h3 className="sr-only">Categories</h3>
      <h3>Filter</h3>
      <div className="grid grid-cols-2 gap-4 ">
        <InputMain className="pb-0 border-none">
          <InputMain.Label
            htmlFor="minPrice"
            label="Max Price"
            className="sr-only"
          />
          <InputMain.Input
            type="text"
            name="minPrice"
            id="minPrice"
            placeholder="$ Min Price"
            value={filterValues.minPrice}
            onChange={onChange}
          />
        </InputMain>
        <InputMain className="pb-0 border-none">
          <InputMain.Label
            htmlFor="maxPrice"
            label="Min Price"
            className="sr-only"
          />
          <InputMain.Input
            type="text"
            name="maxPrice"
            id="maxPrice"
            placeholder="$ Max Price"
            value={filterValues.maxPrice}
            onChange={onChange}
          />
        </InputMain>
      </div>
      <div className="flex gap-4 leading-[18px]">
        <button className="btn-secondary" onClick={clearFilters}>
          Clear
        </button>
        <button className="w-full font-semibold btn-primary" onClick={onSubmit}>
          Apply filter
        </button>
      </div>
    </form>
  )
}

export default NFTMarketplaceFilters
