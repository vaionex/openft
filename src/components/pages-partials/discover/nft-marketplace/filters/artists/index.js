import SelectWImage from '@/components/ui/select-w-image'
import { firebaseGetUserInfoFromDbByArray } from '@/firebase/utils'
import nftSelector from '@/redux/selectors/nft'
import userSelector from '@/redux/selectors/user'
import { setQuery } from '@/redux/slices/nft'
import { algoliaIndex } from '@/services/algolia'
import removeDuplicates from '@/utils/removeDuplicates'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const NftMarketplaceArtistFilter = (props) => {
  const { onArtistFilter } = props
  const [artists, setArtists] = React.useState([])
  const [selectedUser, setSelectedUser] = React.useState(null)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const getUser = async (userIds) => {
    const user = await firebaseGetUserInfoFromDbByArray(userIds, 'users', "__name__")
    return user
  }
  function getUniqueValuesByKey(Nft, key) {
    const uniqueValues = new Set();
    const uniqueArray = [];

    for (const obj of Nft) {
      const value = obj[key];
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        uniqueArray.push(obj[key]);
      }
    }

    return uniqueArray;
  }
  const [hasMore, setHasMore] = useState(false)
  const { currentUser } = useSelector(userSelector)

  const [artistIds, setArtistsIds] = useState([])
  useEffect(async () => {
    setLoading(true)
    const maxFacetHits = 10
    let artistIds = await algoliaIndex.
      searchForFacetValues(
        'minterId',
        "",
        {
          filters: `NOT status:private ${currentUser?.uid ? `AND minterId:${currentUser?.uid}` : ""}`
        }
      )
    setArtistsIds(getUniqueValuesByKey(artistIds.facetHits, "value"))
  }, [])
  useEffect(async () => {
    setLoading(true)
    const itemsPerPage = 10
    if (artistIds?.length) {
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      let paginatedArtists = artistIds.slice(startIndex, endIndex);
      if (paginatedArtists?.length) {
        const users = await getUser(paginatedArtists)
        if (users?.length) {
          setArtists(removeDuplicates([...artists, ...users], 'userId'))
          setHasMore(true)
        } else {
          setHasMore(false)
        }
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [page, artistIds])
  const clearSelectedUser = () => setSelectedUser(null)

  useEffect(() => {
    if (router?.query?.minterId) {
      const selectedUserFromQuery = artists.filter((item) => item.userId === router?.query?.minterId)
      setSelectedUser(selectedUserFromQuery[0])
    } else {
      setSelectedUser(null)

    }

  }, [router?.query, artists])
  const dispatch = useDispatch()
  useEffect(() => {
    onArtistFilter.current = () => {
      if (selectedUser) {
        dispatch(setQuery({ minterId: selectedUser?.userId }))
      }
    }
  }, [selectedUser])
  const loadMore = () => {
    if (!loading)
      setPage(page + 1)
  }
  return (
    <div className="flex flex-col gap-4">
      <SelectWImage
        hasMore={hasMore}
        loadMore={loadMore}
        placeholder="Artists"
        label="Filter"
        users={artists}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        clearSelectedUser={clearSelectedUser}
      />
    </div>
  )
}

export default NftMarketplaceArtistFilter
