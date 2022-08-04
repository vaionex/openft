import Pagination from '@/components/shared/pagination'
import ProductsList from '@/components/shared/products-list'
import Searchbar from '@/components/shared/searchbar'
import React from 'react'
import FilterSection from '../filter'
import ProductSearchSection from '../product-search'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 6,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
]

const ProductsListingSection = () => {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
      <ProductSearchSection />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3 lg:w-1/4">
          <FilterSection />
        </div>
        <div className="md:w-2/3 lg:w-3/4">
          <ProductsList products={products} />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default ProductsListingSection
