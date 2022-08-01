import CompanyBanners from '@/components/common/company-banners'
import { Relysia, Stastoken, Vainoex } from '@/components/common/svgs'
import React from 'react'

const companies = [
  { id: 1, name: 'Vainoex', logo: Vainoex, url: '#' },
  { id: 2, name: 'Relysia', logo: Relysia, url: '#' },
  { id: 3, name: 'Stas Token', logo: Stastoken, url: '#' },
]

const Companies = () => {
  return (
    <div className="py-10 sm:py-14 lg:overflow-hidden">
      <div className="flex mx-auto max-w-6xl lg:px-8">
        <span className="flex flex-col whitespace-nowrap gap-8 items-center w-full md:flex-row">
          <span className="text-lg text-gray-500 mb-3 md:mb-0 w-60 flex justify-center">
            Powered by:
          </span>
          <CompanyBanners companies={companies} />
        </span>
      </div>
    </div>
  )
}

export default Companies
