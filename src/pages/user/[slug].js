import UserOverviewMain from '@/components/pages-partials/user-overview'
import {
  firebaseGetNftByUsername,
  firebaseGetUserInfoFromDb,
  fireGetNftsFromFavList,
} from '@/firebase/utils'
import { useState } from 'react'
import { useEffect } from 'react'

const UserOverviewPage = ({ nftInfo }) => {
  const [userFavList, setUserFavList] = useState(null)
  useEffect(() => {
    if (nftInfo.collectionSize !== 0) {
      ;(async () => {
        const favIdList = await firebaseGetUserInfoFromDb(
          nftInfo.nftsData[0].ownerId,
          'favourites',
        )
        const nfts = await fireGetNftsFromFavList(favIdList.nfts)
        setUserFavList(nfts)
      })()
    }
  }, [])

  return <UserOverviewMain nftInfo={nftInfo} userFavList={userFavList} />
}

export const getServerSideProps = async ({ query }) => {
  const nftInfo = await firebaseGetNftByUsername(query.slug)
  return {
    props: { nftInfo },
  }
}

export default UserOverviewPage
