import React from 'react'


import SharedLayout from '@/components/layout/shared-layout'

import NFTMarketplace from '@/components/pages-partials/discover/nft-marketplace'
import BannerSection from '@/components/pages-partials/discover/banner'
import Cta from '@/components/pages-partials/discover/cta'




export default function DiscoverPage() {
  return (
    <>
      <SharedLayout title="Discover">
        <BannerSection />
        <NFTMarketplace />
        <Cta />
      </SharedLayout>
    </>
  )
}


