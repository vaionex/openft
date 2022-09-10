import SelectWImage from '@/components/ui/select-w-image'
import { firebaseGetUserInfoFromDb } from '@/firebase/utils'
import React, { useEffect, useState } from 'react'
import { connectRefinementList } from 'react-instantsearch-dom'

const NftMarketplaceArtistFilter = ({ items, refine }) => {
  const [artists, setArtists] = React.useState([])
  const [selectedUser, setSelectedUser] = React.useState(null)

  const getUser = async (uid) => {
    const user = await firebaseGetUserInfoFromDb(uid)
    return user
  }

  const clearSelectedUser = () => {
    setSelectedUser(null)
    refine([])
  }

  useEffect(() => {
    const getArtists = async () => {
      const artists = await Promise.all(
        items.map(async (item) => {
          const { name, profileImage, username, uid } = await getUser(
            item.label,
          )
          return {
            name,
            profileImage,
            username,
            uid,
          }
        }),
      )
      setArtists(artists)
    }
    if (items.length !== 0) {
      getArtists()
    }
  }, [items])

  useEffect(() => {
    if (selectedUser) {
      refine(selectedUser.uid)
    }
  }, [selectedUser])

  return (
    <div className="flex flex-col gap-4">
      <SelectWImage
        placeholder="Artists"
        label="Artist Filter"
        users={artists}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        clearSelectedUser={clearSelectedUser}
      />
    </div>
  )
}

export default connectRefinementList(NftMarketplaceArtistFilter)
