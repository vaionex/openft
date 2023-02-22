import UserOverviewMain from '@/components/pages-partials/user-overview'
import {
  firebaseGetNftByUsername,
  firebaseGetUserDetailByUsername,
  firebaseGetUserInfoFromDb,
  fireGetNftsFromFavList,
} from '@/firebase/utils'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const UserOverviewPage = ({ nftInfo, userDetail }) => {
  const router = useRouter()
  const [userFavList, setUserFavList] = useState(null)
  const userInfo = userDetail.nftsData[0]
  useEffect(() => {
    if (nftInfo.collectionSize !== 0) {
      ; (async () => {
        const favIdList = await firebaseGetUserInfoFromDb(
          nftInfo.nftsData[0].ownerId,
          'favourites',
        )
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
  const userDetail = await firebaseGetUserDetailByUsername(query.slug, query?.type)
  const nftInfo = await firebaseGetNftByUsername(query.slug, query?.type)
  return {
    props: { nftInfo, userDetail },
  }
}

export default UserOverviewPage
