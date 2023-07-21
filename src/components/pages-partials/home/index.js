import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import CollectionsSection from './collections'
import CompaniesSection from './compaines'
import CtaMidSection from './cta-mid'
import HeroSection from './hero'

const HomePageMain = ({ nftsData, setproductsArr }) => {
  return (
    <SharedLayout title="Home">
      <HeroSection />
      <CompaniesSection />
      <CollectionsSection nftsData={nftsData} setproductsArr={setproductsArr} />
      <CtaMidSection />
      <BannerSection />
    </SharedLayout>
  )
}

export default HomePageMain
