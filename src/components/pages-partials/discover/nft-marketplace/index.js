import { useEffect, useState } from 'react'
import { MagnifyGlassIcon, MoreFilterIcon } from '@/components/common/icons'
import { FilterIcon } from '@heroicons/react/solid'
import { firebaseGetSingleDoc } from '@/firebase/utils'
import { useSelector } from 'react-redux'
import FilteredContents from './products'

import userSelector from '@/redux/selectors/user'
import NFTMarketplaceSearch from './search'
import NFTMarketplaceMobileFilters from './mobile-filters'
import NFTMarketplaceFilters from './filters'
import { useRouter } from 'next/router'
import Pagination from '@/components/ui/pagination'

const NFTMarketplace = ({ nftsData, nftCollectionSize, nftLimit }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [favouriteNfts, setFavouriteNfts] = useState(null)
  const router = useRouter()

  const { currentUser } = useSelector(userSelector)

  const handlePageClick = (page) => {
    const currentPath = router.pathname
    const currentQuery = { ...router.query }
    currentQuery.page = page.selected + 1

    router.push({
      pathname: currentPath,
      query: currentQuery,
    })
  }

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
                <Pagination
                  handlePageClick={handlePageClick}
                  pageCount={Math.ceil(nftCollectionSize / nftLimit)}
                  currentPage={router.query.page ? router.query.page : 1}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default NFTMarketplace
