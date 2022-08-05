import DiscoverBanner from '@/components/shared/discover-banner'
import React from 'react'

const pages = [{ name: 'Discover', href: '/discover', current: false }]

const BannerSection = () => {
  return (
    <div className="py-6">
      <DiscoverBanner pages={pages} action="breadcrumb" />
    </div>
  )
}

export default BannerSection
