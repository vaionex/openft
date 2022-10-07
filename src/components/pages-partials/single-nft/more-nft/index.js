import { ProductsCarouselCard } from '@/components/ui/cards'
import usePriceConverter from '@/hooks/usePriceConverter'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '1',
    imageURL: '/images/mock-carousel/Image.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '2',
    imageURL: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '3',
    imageURL: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '3',
    imageURL: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '4',
    imageURL: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 6,
    name: 'Basic Tee',
    href: '5',
    imageURL: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 7,
    name: 'Basic Tee',
    href: '3',
    imageURL: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 8,
    name: 'Basic Tee',
    href: '4',
    imageURL: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 9,
    name: 'Basic Tee',
    href: '5',
    imageURL: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
]

export default function MoreNft() {
  const usdBalance = usePriceConverter()

  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <section aria-labelledby="products-heading" className="pt-6 pb-24">
        {/* Product grid */}
        <div className="lg:col-span-3">
          {/* Replace with your content */}
          <div className="h-full">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
              {products.map((item) => (
                <ProductsCarouselCard
                  key={item.id}
                  data={item}
                  usdBalance={usdBalance}
                />
              ))}
            </div>
          </div>
          {/* /End replace */}
        </div>
        <div className="flex items-center justify-center rounded-md mt-14">
          <button className="max-w-[200px] flex items-center justify-center w-full text-base font-medium text-gray-600 bg-white border border-gray-200 rounded-md px-7 hover:bg-gray-50 py-2 md:text-lg md:px-3">
            Discover More
          </button>
        </div>
      </section>
    </div>
  )
}
