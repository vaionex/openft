import { useEffect, useRef, useState } from 'react'
import { FilterIcon } from '@heroicons/react/solid'
import NFTMarketplaceSearch from './search'
import NFTMarketplaceMobileFilters from './mobile-filters'
import NFTMarketplaceFilters from './filters'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import NFTMarketplaceResults from './products/results'
import { firebaseGetSingleDoc } from '@/firebase/utils'

const NFTMarketplace = ({
  indexName,
  searchClient,
  searchState,
  currentUser,
  ...restProps
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [favouriteNfts, setFavouriteNfts] = useState(null)

  useEffect(() => {
    const setFavorites = async () => {
      if (currentUser) {
        const data = await firebaseGetSingleDoc('favourites', currentUser?.uid)
        setFavouriteNfts(data?.nfts)
      } else {
        setFavouriteNfts([])
      }
    }
    setFavorites()
  }, [currentUser])

  return (
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      searchState={searchState}
      resultsState={restProps.resultsState}
      onSearchParameters={restProps.onSearchParameters}
      onSearchStateChange={restProps.onSearchStateChange}
      createURL={restProps.createURL}
      {...restProps}
    >
      <Configure hitsPerPage={9} />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative z-10 flex gap-4 pt-24 pb-6 ">
          <NFTMarketplaceSearch />
          <div className="flex items-center justify-end lg:hidden">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500 "
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <NFTMarketplaceMobileFilters
                open={mobileFiltersOpen}
                onClose={setMobileFiltersOpen}
              />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 cursor">
            <div className="hidden lg:block">
              <NFTMarketplaceFilters attribute="amount" />
            </div>

            <div className="lg:col-span-3">
              <NFTMarketplaceResults />
            </div>
          </div>
        </section>
      </div>
    </InstantSearch>
  )
}

export default NFTMarketplace
