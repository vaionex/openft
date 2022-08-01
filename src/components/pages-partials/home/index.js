import SharedLayout from '@/components/layout/shared-layout'
import Companies from './compaines'
import HeroSection from './hero'

const HomePageMain = () => {
  return (
    <SharedLayout title="Home">
      <HeroSection />
      <Companies />
    </SharedLayout>
  )
}

export default HomePageMain
