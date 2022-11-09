import { ProductsCarouselCard } from '@/components/ui/cards'
import usePriceConverter from '@/hooks/usePriceConverter'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import { searchClientLite as searchClient } from '@/services/algolia'
import NextLink from 'next/link'
import Products from './Products'

export default function MoreNft({
  indexName,
  favouriteNfts,
  setFavouriteNfts,
  ...restProps
}) {
  const usdBalance = usePriceConverter()

  return (
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      {...restProps}
    >
      <Configure hitsPerPage={9} />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          {/* Product grid */}
          <div className="lg:col-span-3">
            {/* Replace with your content */}
            <div className="h-full">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                <Products
                  favouriteNfts={favouriteNfts}
                  setFavouriteNfts={setFavouriteNfts}
                />
              </div>
            </div>
            {/* /End replace */}
          </div>
          <div className="flex items-center justify-center rounded-md mt-14">
            <NextLink href="/discover">
              <a className="max-w-[200px] flex items-center justify-center w-full text-base font-medium text-gray-600 bg-white border border-gray-200 rounded-md px-7 hover:bg-gray-50 py-2 md:text-lg md:px-3">
                Discover More
              </a>
            </NextLink>
          </div>
        </section>
      </div>
    </InstantSearch>
  )
}
