import CompanyBanners from '@/components/common/company-banners'
import { Relysia, Stastoken, Vainoex } from '@/components/common/svgs'
import React from 'react'

const companies = [
  { id: 1, name: 'Vainoex', logo: Vainoex, url: '#' },
  { id: 2, name: 'Relysia', logo: Relysia, url: '#' },
  { id: 3, name: 'Stas Token', logo: Stastoken, url: '#' },
]

const CompaniesSection = () => {
  return (
    <div className="py-10 sm:py-14 lg:overflow-hidden">
      <div className="flex max-w-6xl mx-auto lg:px-8">
        <span className="flex flex-col items-center w-full gap-8 whitespace-nowrap md:flex-row">
          <span className="flex justify-center mb-3 text-lg text-gray-500 md:mb-0 w-60">
            Powered by:
          </span>
          <CompanyBanners companies={companies} />
        </span>
      </div>
    </div>
  )
}

export default CompaniesSection
