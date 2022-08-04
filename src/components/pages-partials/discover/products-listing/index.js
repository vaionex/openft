import Pagination from '@/components/shared/pagination'
import ProductsList from '@/components/shared/products-list'
import Searchbar from '@/components/shared/searchbar'
import { BUY_NOW, ON_AUCTION } from '@/utils/constants'
import React, { useEffect, useRef, useState } from 'react'
import FilterSection from '../filter'
import ProductSearchSection from '../product-search'

const products = [
  {
    id: 1,
    name: 'Blooby ice',
    href: '#',
    imageSrc: '/images/mock-carousel/Image.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 57.81,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 2,
    name: 'Spinny bubble',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 3,
    name: 'Blockbox',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 4,
    name: 'Little ghost',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'On auction',
  },
  {
    id: 5,
    name: 'Blooby ice',
    href: '#',
    imageSrc: '/images/mock-carousel/Image.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 57.81,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 6,
    name: 'Spinny bubble',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'On auction',
  },
  {
    id: 7,
    name: 'Blockbox',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 8,
    name: 'Little ghost',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 9,
    name: 'Blooby ice',
    href: '#',
    imageSrc: '/images/mock-carousel/Image.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 57.81,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'On auction',
  },
  {
    id: 10,
    name: 'Spinny bubble',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 11,
    name: 'Blockbox',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'On auction',
  },
  {
    id: 12,
    name: 'Little ghost',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 13,
    name: 'Blooby ice',
    href: '#',
    imageSrc: '/images/mock-carousel/Image.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 57.81,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 14,
    name: 'Spinny bubble',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 15,
    name: 'Blockbox',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 16,
    name: 'Little ghost',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 17,
    name: 'Blooby ice',
    href: '#',
    imageSrc: '/images/mock-carousel/Image.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 57.81,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 18,
    name: 'Spinny bubble',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 19,
    name: 'Blockbox',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 20,
    name: 'Little ghost',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 35,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
  {
    id: 21,
    name: 'Little ghost',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 60,
    priceType: 'BSV 1',
    owner: 'Vaionex art',
    sellingType: 'Buy now',
  },
]
const limitPerPage = 5
const ProductsListingSection = () => {
  const [filteredProducts, setFilteredProducts] = useState([...products])
  const searchTerm = useRef('')
  const minPrice = useRef(0)
  const maxPrice = useRef(null)
  const [productSellingType, setProductSellingType] = useState(BUY_NOW)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentPageData, setCurrentPageData] = useState([])

  const handleApplyFilters = () => {
    const tempProducts = products.filter(
      (product) =>
        productSellingType === product.sellingType &&
        product.name
          .toLowerCase()
          .includes(searchTerm.current.value.toLowerCase()),
    )
    if (minPrice.current.value >= 0) {
      tempProducts = tempProducts.filter(
        (product) => product.price >= minPrice.current.value,
      )
    }
    if (maxPrice.current.value > 0) {
      tempProducts = tempProducts.filter(
        (product) => product.price <= maxPrice.current.value,
      )
    }
    setFilteredProducts(tempProducts)
  }

  const handleProductSellingType = (sellingType) => {
    setProductSellingType(sellingType)
  }

  useEffect(() => {
    handleApplyFilters()
  }, [productSellingType])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (filteredProducts?.length > 0) setCurrentPage(1)
    else setCurrentPage(0)
  }, [filteredProducts])

  useEffect(() => {
    if (currentPage > 0)
      setCurrentPageData(
        filteredProducts.slice(
          (currentPage - 1) * limitPerPage,
          currentPage * limitPerPage,
        ),
      )
  }, [currentPage])

  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
      <ProductSearchSection
        handleApplyFilters={handleApplyFilters}
        searchTerm={searchTerm}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3 lg:w-1/4">
          <FilterSection
            minPrice={minPrice}
            maxPrice={maxPrice}
            productSellingType={productSellingType}
            handleApplyFilters={handleApplyFilters}
            handleProductSellingType={handleProductSellingType}
          />
        </div>
        <div className="md:w-2/3 lg:w-3/4">
          <ProductsList products={currentPageData} />
          {limitPerPage < filteredProducts.length && (
            <Pagination
              limitPerPage={limitPerPage}
              totalData={filteredProducts.length}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsListingSection
