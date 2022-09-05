import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import NFTMarketplace from './nft-marketplace'
import Cta from './cta'

const DiscoverPageMain = ({ pageLimit, isFiltered }) => {
  return (
    <SharedLayout title="Discover">
      <BannerSection />
      <NFTMarketplace pageLimit={pageLimit} isFiltered={isFiltered} />
      <Cta />
    </SharedLayout>
  )
}

export default DiscoverPageMain
