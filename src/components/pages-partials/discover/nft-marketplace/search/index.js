import { MagnifyGlassIcon } from '@/components/common/icons'
import { InputMain } from '@/components/ui/inputs'
import React, { useEffect, useState } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

//eslint-disable-next-line
const NFTMarketplaceSearch = React.forwardRef((props, myRef) => {
  const { currentRefinement, refinementBrand, refine } = props
  const [searchState, setSearchState] = useState(currentRefinement)
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  const handleChange = (e) => {
    setSearchState(e.target.value)
  }

  const handleSubmit = (val) => {
    refine(val)
  }

  if (!showChild) {
    return <p>Loading {props.attribute}...</p>
  }

  return (
    <div className="flex items-center w-full gap-2">
      <InputMain className="relative w-full pb-0 border-none">
        <span className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
          <MagnifyGlassIcon className="w-5 h-5 text-gray-400 " />
        </span>
        <InputMain.Label htmlFor="search" label="Search" className="sr-only" />
        <InputMain.Input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          value={searchState}
          inputClassName="pl-10 min-h-[44px]"
          onChange={handleChange}
        />
      </InputMain>
      <button
        className="p-3 rounded-md btn-primary"
        onClick={() => handleSubmit(searchState)}
      >
        <span className="sr-only">Search Button</span>
        <MagnifyGlassIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  )
})

export default connectSearchBox(NFTMarketplaceSearch)
