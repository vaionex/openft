import SharedLayout from '@/components/layout/shared-layout'
import BannerSection from './banner'
import CollectionsSection from './collections'
import CompaniesSection from './compaines'
import CtaMidSection from './cta-mid'
import HeroSection from './hero'

const HomePageMain = ({ nftsData }) => {
  return (
    <SharedLayout title="Home">
      <HeroSection />
      <CompaniesSection />
      <CollectionsSection nftsData={nftsData} />
      <CtaMidSection />
      <BannerSection /> 
    </SharedLayout>
  )
}

export default HomePageMain
