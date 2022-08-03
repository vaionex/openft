import Carousel from '@/components/ui/carousel'
import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'

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

const CollectionsSection = () => {
  return (
    <div className="relative px-4 mx-auto md:pb-20 3xlg:pb-[740px] max-w-7xl lg:mt-24 sm:px-6 lg:px-8">
      <div className="sm:text-center lg:text-left">
        <h2 className="mt-4 text-4xl tracking-[-2%] sm:mt-5">
          Hot collections
        </h2>
        <p className="mt-6 text-base sm:text-xl">
          Best selling collection selected by exchangers.
        </p>
      </div>
      <div className="top-0 right-8 lg:absolute sm:flex sm:gap-3 sm:justify-center lg:justify-start">
        <div className="my-3 rounded-md sm:my-0">
          <NextLink href="#">
            <a className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 md:text-lg">
              Learn More
            </a>
          </NextLink>
        </div>
        <div className="rounded-md">
          <NextLink href="/register">
            <a className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white border border-transparent rounded-md btn-primary 0 md:text-lg">
              Create account
            </a>
          </NextLink>
        </div>
      </div>
      <div className="3xlg:absolute py-12 mx-auto lg:py-20 max-w-7xl 3xlg:max-w-[1364px] ">
        <Carousel data={products} />
      </div>
    </div>
  )
}

export default CollectionsSection
