import { MagnifyGlassIcon } from '@/components/common/icons'
import React from 'react'

const NFTMarketplaceSearch = () => {
  return (
    <div className="flex w-full col-span-10 space-x-2 sm:col-span-11 lg:col-span-12">
      <div className="w-full">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 sr-only"
        >
          Search
        </label>
        <div className="relative w-full rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyGlassIcon className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block w-full min-h-[44px] pl-10 border-gray-200 rounded-md focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            placeholder="Search"
          />
        </div>
      </div>
      <button className="p-3 rounded-md btn-primary">
        <MagnifyGlassIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  )
}

export default NFTMarketplaceSearch
