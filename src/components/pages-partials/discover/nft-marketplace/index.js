import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { MagnifyGlassIcon, MoreFilterIcon } from '@/components/common/icons'
import {
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import {
  firebaseGetFilterNfts,
  firebsaeFetchNextData,
  firebaseGetSingleDoc,
} from '@/firebase/utils'
import { useSelector } from 'react-redux'
import FilteredContents from './products'
import Pagination from './pagination'
import userSelector from '@/redux/selectors/user'
import NFTMarketplaceSearch from './search'
import NFTMarketplaceMobileFilters from './mobile-filters'
import NFTMarketplaceFilters from './filters'

export default function CategoryFilter({ nftsData }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [favouriteNfts, setFavouriteNfts] = useState(null)

  const { currentUser } = useSelector(userSelector)

  return (
    <div>
      <div>
        {/* Mobile filter dialog */}
        <NFTMarketplaceMobileFilters
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />
        {/* end of mobile filter dialog */}

        <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative z-10 flex gap-4 pt-24 pb-6 ">
            <NFTMarketplaceSearch />

            <div className="flex items-center justify-end lg:hidden">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500 "
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              NFT Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <div className="hidden lg:block">
                <NFTMarketplaceFilters />
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="h-full">
                  <FilteredContents
                    favouriteNfts={favouriteNfts}
                    nftItems={nftsData}
                  />
                </div>
                <Pagination />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
