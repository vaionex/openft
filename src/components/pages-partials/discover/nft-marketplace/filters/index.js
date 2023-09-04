import React, { useState } from 'react'
import NFTMarketplaceAmountFilter from './amounts'
import NftMarketplaceArtistFilter from './artists'

import CustomClearRefinements from './clear'
import { fetchFilteredNFTs, firebaseGetNfts } from '@/firebase/utils'
import { useDispatch } from 'react-redux'
import { setNfts, setTotalPages } from '@/redux/slices/nft'
import { useEffect } from 'react'
import ButtonWLoading from '@/components/ui/button-w-loading'

const NFTMarketplaceFilters = ({ setUpdate, update }) => {
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const [artistName, setArtistName] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSubmit = async () => {
    try {
      if (!minPrice && !maxPrice && !artistName) {
        setUpdate(!update)
        return
      }
      setIsPending(true)
      // Perform filtering based on artistName, minPrice, and maxPrice
      const { filteredNFTs } = await fetchFilteredNFTs(
        artistName,
        minPrice,
        maxPrice,
      )
      // Update your Redux state with the filtered NFTs
      dispatch(setNfts(filteredNFTs))
      dispatch(setTotalPages(1))
    } catch (error) {
      console.log('error: ', error)
      setIsPending(false)
    } finally {
      setIsPending(false)
    }
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
            artistName={artistName}
            setArtistName={setArtistName}
          />
        </li>
        <li className="pt-6">
          <NFTMarketplaceAmountFilter
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </li>
        <li className="flex gap-4 leading-[12px] pt-6">
          <CustomClearRefinements />

          <ButtonWLoading
            className="py-[9px] px-4 text-base font-medium lg:w-full text-white bg-azul hover:bg-ultramarine rounded-lg border border-azul"
            isPending={isPending}
            onClick={handleSubmit}
            text="Apply Filters"
            fullWidth
          />
        </li>
      </ul>
    </div>
  )
}

export default NFTMarketplaceFilters
