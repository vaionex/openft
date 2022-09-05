import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import NFTMarketplace from './nft-marketplace'
import Cta from './cta'

const DiscoverPageMain = ({ products, pageLimit, totalPage, productCount }) => {
  return (
    <SharedLayout title="Discover">
      <BannerSection />
      <NFTMarketplace
        products={products}
        pageLimit={pageLimit}
        totalPage={totalPage}
        productCount={productCount}
      />
      <Cta />
    </SharedLayout>
  )
}

export default DiscoverPageMain
