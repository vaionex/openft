import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import NFTMarketplace from './nft-marketplace'
import Cta from './cta'

const DiscoverPageMain = ({ nftsData, nftCollectionSize, nftLimit }) => {
  return (
    <SharedLayout title="Discover">
      <BannerSection />
      <NFTMarketplace
        nftsData={nftsData}
        nftCollectionSize={nftCollectionSize}
        nftLimit={nftLimit}
      />
      <Cta />
    </SharedLayout>
  )
}

export default DiscoverPageMain
