import NextLink from 'next/link'
import Products from './Products'

export default function MoreNft({
  favouriteNfts,
  setFavouriteNfts,
}) {

  return (

    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <section aria-labelledby="products-heading" className="pt-10">
        {/* Product grid */}
        <div className="lg:col-span-3">
          {/* Replace with your content */}
          <div className="h-full">
            <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
              <Products
                favouriteNfts={favouriteNfts}
                setFavouriteNfts={setFavouriteNfts}
              />
            </div>
          </div>
          {/* /End replace */}
        </div>
        <div className="flex items-center justify-center rounded-md my-14">
          <NextLink href="/discover">
            <a className="max-w-[151px] flex items-center justify-center w-full text-base font-medium text-bluewood bg-white border border-gray-200 rounded-md px-3 hover:bg-gray-50 py-[11px]">
              Discover More
            </a>
          </NextLink>
        </div>
      </section>
    </div>

  )
}
