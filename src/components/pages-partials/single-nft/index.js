import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import MoreNft from './more-nft'
import NftDetail from './nft-detail'
import Cta from './cta'

const SingleNftPageMain = () => {
  return (
    <SharedLayout title="SingleNft">
      <NftDetail />
      <BannerSection />
      <MoreNft />
      <Cta />
    </SharedLayout>
  )
}

export default SingleNftPageMain
