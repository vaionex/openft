import UserOverviewMain from '@/components/pages-partials/user-overview'
import {
  firebaseGetNftByUsername,
  firebaseGetUserInfoFromDb,
  fireGetNftsFromFavList,
} from '@/firebase/utils'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const UserOverviewPage = ({ nftInfo }) => {
  const router = useRouter()
  const [userFavList, setUserFavList] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  useEffect(() => {
    if (nftInfo.collectionSize !== 0) {
      ;(async () => {
        const favIdList = await firebaseGetUserInfoFromDb(
          nftInfo.nftsData[0].ownerId,
          'favourites',
        )
        const userInfo = await firebaseGetUserInfoFromDb(
          nftInfo.nftsData[0].ownerId,
          'users',
        )
        setUserInfo(userInfo)
        if (favIdList) {
          const nfts = await fireGetNftsFromFavList(favIdList.nfts)
          setUserFavList(nfts)
        }
      })()
    } else {
      router.replace('/')
    }
  }, [])

  return (
    <UserOverviewMain
      nftInfo={nftInfo}
      userFavList={userFavList}
      userInfo={userInfo}
    />
  )
}

export const getServerSideProps = async ({ query }) => {
  const nftInfo = await firebaseGetNftByUsername(query.slug)
  return {
    props: { nftInfo },
  }
}

export default UserOverviewPage
