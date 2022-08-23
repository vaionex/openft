import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import CategoryFilter from './category-filter'
import Cta from './cta'

const DiscoverPageMain = ({ nftsData }) => {
  return (
    <SharedLayout title="Discover">
      <BannerSection />
      <CategoryFilter nftsData={nftsData} />
      <Cta />
    </SharedLayout>
  )
}

export default DiscoverPageMain
