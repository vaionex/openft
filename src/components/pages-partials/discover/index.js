import SharedLayout from '@/components/layout/shared-layout'
import CtaMidSection from '../home/cta-mid'
import BannerSection from './banner'
import ProductsListingSection from './products-listing'

const DiscoverMain = () => {
  return (
    <SharedLayout title="Discover">
      <BannerSection />
      <ProductsListingSection />
      <CtaMidSection />
    </SharedLayout>
  )
}

export default DiscoverMain
