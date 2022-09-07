import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import NFTMarketplace from './nft-marketplace'
import Cta from './cta'

const DiscoverPageMain = (props) => {
  console.log(props, 'props')
  return (
    <SharedLayout title="Discover">
      <BannerSection />
      {/* <NFTMarketplace /> */}
      <Cta />
    </SharedLayout>
  )
}

export default DiscoverPageMain
