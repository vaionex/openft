import SharedLayout from '@/components/layout/shared-layout'
import Companies from './compaines'
import CtaMidSection from './cta-mid'
import HeroSection from './hero'

const HomePageMain = () => {
  return (
    <SharedLayout title="Home">
      <HeroSection />
      <Companies />
      <CtaMidSection />
    </SharedLayout>
  )
}

export default HomePageMain
