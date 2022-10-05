import SelectWImage from '@/components/ui/select-w-image'
import { firebaseGetUserInfoFromDb } from '@/firebase/utils'
import React, { useEffect, useState } from 'react'
import { connectRefinementList } from 'react-instantsearch-dom'

const NftMarketplaceArtistFilter = (props) => {
  const { items, refine, onArtistFilter, currentRefinement } = props
  const [artists, setArtists] = React.useState([])
  const [selectedUser, setSelectedUser] = React.useState(null)

  const getUser = async (userId) => {
    const user = await firebaseGetUserInfoFromDb(userId)
    return user
  }

  const clearSelectedUser = () => setSelectedUser(null)

  useEffect(() => {
    const getArtists = async () => {
      const artists = await Promise.all(
        items.map(async (item) => {
          let userData = await getUser(item.label)
          if (userData) {
            const { name, profileImage, username, uid } = userData
            return {
              isRefined: item.isRefined,
              name,
              profileImage,
              username,
              userId: uid,
            }
          } else {
            return null
          }
        }),
      )
      setArtists(artists.filter((x) => x))
    }
    if (items.length !== 0) {
      getArtists()
    }
  }, [items])

  useEffect(() => {
    if (currentRefinement.length > 0 && !selectedUser) {
      const selectedUserFromQuery = artists.filter((item) => item.isRefined)
      setSelectedUser(selectedUserFromQuery[0])
    }

    if (currentRefinement.length === 0 && selectedUser) {
      clearSelectedUser()
    }
  }, [artists, currentRefinement])

  useEffect(() => {
    onArtistFilter.current = () => {
      if (selectedUser) {
        refine(selectedUser.userId)
      }
    }
  }, [selectedUser, refine])

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
