import React from 'react'
import NFTMarketplaceAmountFilter from './amounts'
import NftMarketplaceArtistFilter from './artists'
import {
  connectConfigure,
  connectCurrentRefinements,
  connectStateResults,
  connectToggleRefinement,
} from 'react-instantsearch-dom'
import CustomClearRefinements from './clear'

const NFTMarketplaceFilters = () => {
  const onArtistFilter = React.useRef()
  const onAmountFilter = React.useRef()

  const handleSubmit = () => {
    onArtistFilter.current()

    setTimeout(() => {
      onAmountFilter.current()
    }, 500)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <h3 className="sr-only">Filters</h3>
          <h3 className="px-3 font-medium text-gray-900 bg-white">Filters</h3>
        </div>
      </div>
      <ul role="list" className="space-y-6 divide-y divide-gray-200">
        <li>
          <NftMarketplaceArtistFilter
            attribute="userId"
            onArtistFilter={onArtistFilter}
          />
        </li>
        <li className="pt-6">
          <NFTMarketplaceAmountFilter
            attribute="amount"
            onAmountFilter={onAmountFilter}
          />
        </li>
        <li className="flex gap-4 leading-[12px] pt-6">
          <CustomClearRefinements />
          <button
            className="py-2 text-sm font-semibold lg:w-full btn-primary"
            onClick={handleSubmit}
          >
            Apply Filters
          </button>
        </li>
      </ul>
    </div>
  )
}

export default NFTMarketplaceFilters
