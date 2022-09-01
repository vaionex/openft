import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import NFTMarketplace from './nft-marketplace'
import Cta from './cta'

const DiscoverPageMain = ({ nftsData }) => {
  return (
    <SharedLayout title="Discover">
      <BannerSection />
      <NFTMarketplace nftsData={nftsData} />
      <Cta />
    </SharedLayout>
  )
}

export default DiscoverPageMain
