import { Relysia, Stastoken, Vainoex } from '@/components/common/svgs'
import CompanyBanners from '@/components/shared/company-banners'
import React from 'react'

const companies = [
  { id: 1, name: 'Vainoex', logo: Vainoex, url: 'https://www.vaionex.com/' },
  { id: 2, name: 'Relysia', logo: Relysia, url: 'https://www.relysia.com/' },
  {
    id: 3,
    name: 'Stas Token',
    logo: Stastoken,
    url: 'https://www.stastoken.com/',
  },
]

const CompaniesSection = () => {
  return (
    <div className="py-10 sm:py-14 lg:overflow-hidden">
      <div className="flex max-w-6xl mx-auto lg:px-8">
        <span className="flex flex-col items-center w-full gap-8 whitespace-nowrap md:flex-row">
          <span className="flex justify-center text-lg text-gray-500 w-60">
            Powered by:
          </span>
          <CompanyBanners companies={companies} />
        </span>
      </div>
    </div>
  )
}

export default CompaniesSection
