import React, { useEffect, useState } from 'react'
import { InputMain } from '@/components/ui/inputs'

const NftMarketplaceArtistFilter = (props) => {
  const { artistName, setArtistName } = props

  const handleChange = (e) => {
    const { value } = e.target
    setArtistName(value) // Update the artistName using the setArtistName prop
  }

  return (
    <div className="flex flex-col gap-4">
      <InputMain className="relative pb-0 border-none">
        <InputMain.Label
          htmlFor="artist"
          label="Artist Name"
          className="sr-only"
        />
        <InputMain.Input
          type="text"
          name="artist"
          id="artistName"
          placeholder="Artists"
          value={artistName}
          onChange={handleChange}
          inputClassName="pl-7"
        />
      </InputMain>
    </div>
  )
}

export default NftMarketplaceArtistFilter
