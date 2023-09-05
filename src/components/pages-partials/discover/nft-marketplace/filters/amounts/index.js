import { useCallback, useEffect, useState } from 'react'
import { InputMain } from '@/components/ui/inputs'
import { useDispatch } from 'react-redux'
import { setQuery } from '@/redux/slices/nft'
import { useRouter } from 'next/router'

const NFTMarketplaceAmountFilter = (props) => {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice } = props
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState(null)

  const handleMinChange = (e) => {
    const { name, value } = e.target
    setMinPrice(value)
  }

  const handleMaxChange = (e) => {
    const { name, value } = e.target
    setMaxPrice(value)
  }

  return (
    <div className="flex flex-col ">
      <span className="text-sm">Price Filter</span>
      <div className="grid grid-cols-2 gap-4">
        <InputMain className="relative pb-0 border-none">
          <InputMain.Label
            htmlFor="min"
            label="Max Price"
            className="sr-only"
          />
          {/* <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div> */}
          <InputMain.Input
            type="number"
            name="min"
            id="minPrice"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinChange}
            // inputClassName="pl-7"
            min={0}
          />
        </InputMain>
        <InputMain className="relative pb-0 border-none">
          <InputMain.Label
            htmlFor="max"
            label="Min Price"
            className="sr-only"
          />
          {/* <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div> */}
          <InputMain.Input
            type="number"
            name="max"
            id="maxPrice"
            placeholder="Max Price"
            // inputClassName="pl-7"
            value={maxPrice}
            onChange={handleMaxChange}
            min={0}
          />
        </InputMain>
      </div>
      {errorMessage && (
        <span className="w-full mt-2 text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  )
}

export default NFTMarketplaceAmountFilter
