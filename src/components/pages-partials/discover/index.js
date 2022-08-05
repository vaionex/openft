import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import CategoryFilter from './category-filter'
import Cta from './cta'

const HomePageMain = () => {
  return (
    <SharedLayout title="Home">
      <BannerSection />
      <CategoryFilter />
      <Cta />
    </SharedLayout>
  )
}

export default HomePageMain
