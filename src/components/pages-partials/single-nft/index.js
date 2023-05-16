import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import MoreNft from './more-nft'
import NftDetail from './nft-detail'
import Cta from './cta'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import { useEffect, useState } from 'react'
import { firebaseGetSingleDoc } from '@/firebase/utils'

const SingleNftPageMain = () => {
  const { currentUser } = useSelector(userSelector)
  const [favouriteNfts, setFavouriteNfts] = useState(null)

  useEffect(() => {
    const setFavorites = async () => {
      if (currentUser) {
        const data = await firebaseGetSingleDoc('favourites', currentUser?.uid)
        setFavouriteNfts(data?.nfts)
      } else {
        setFavouriteNfts([])
      }
    }
    setFavorites()
  }, [currentUser])

  return (
    <SharedLayout title="SingleNft">
      <NftDetail
        favouriteNfts={favouriteNfts}
        setFavouriteNfts={setFavouriteNfts}
      />
      <BannerSection />
      <MoreNft
        favouriteNfts={favouriteNfts}
        setFavouriteNfts={setFavouriteNfts}
      />
      <Cta />
    </SharedLayout>
  )
}

export default SingleNftPageMain
