import { MagnifyGlassIcon } from '@/components/common/icons'
import { InputMain } from '@/components/ui/inputs'
import { setQuery } from '@/redux/slices/nft'
import { XCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

//eslint-disable-next-line
const NFTMarketplaceSearch = React.forwardRef((props, myRef) => {
  const router = useRouter()
  const [searchState, setSearchState] = useState("")
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (router?.query?.search) {
      setSearchState(router?.query?.search)
    } else {
      setSearchState("")
    }
  }, [router?.query])
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e) => {
    setSearchState(e.target.value)
  }
  const dispatch = useDispatch()
  const handleSubmit = async (e, val) => {
    e.preventDefault()
    dispatch(setQuery({ search: val }))
  }

  const handleClear = () => {
    dispatch(setQuery({ search: "" }))
  }

  if (!mounted) return null
  return (
    <form
      onSubmit={(e) => handleSubmit(e, searchState)}
      className="flex items-center w-full gap-3"
    >
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
        {searchState && (
          <div
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 cursor-pointer rounded-r-md focus:outline-none"
          >
            <XCircleIcon className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </InputMain>
      <button className="p-3 rounded-md bg-azul hover:bg-ultramarine">
        <span className="sr-only">Search Button</span>
        <MagnifyGlassIcon className="w-5 h-5 text-white" />
      </button>
    </form>
  )
})

export default NFTMarketplaceSearch
