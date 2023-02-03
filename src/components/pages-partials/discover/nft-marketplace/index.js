import { useEffect, useRef, useState } from 'react'
import NFTMarketplaceSearch from './search'
import NFTMarketplaceMobileFilters from './mobile-filters'
import NFTMarketplaceFilters from './filters'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import NFTMarketplaceProducts from './products'
import { firebaseGetSingleDoc } from '@/firebase/utils'
import { useMediaQuery } from 'react-responsive'

const NFTMarketplace = ({
  indexName,
  searchClient,
  searchState,
  currentUser,
  ...restProps
}) => {
  const toTopRef = useRef(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [favouriteNfts, setFavouriteNfts] = useState()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  })

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
      <Configure hitsPerPage={9} filters="status:live" />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-6" ref={toTopRef}>
        <div className="relative z-10 flex gap-4 pt-0 pb-6">
          <NFTMarketplaceSearch />
        </div>
        {!isDesktopOrLaptop && (
          <NFTMarketplaceMobileFilters
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
          />
        )}

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 cursor">
            {isDesktopOrLaptop && (
              <div className="hidden lg:block">
                <NFTMarketplaceFilters />
              </div>
            )}

            <div className="lg:col-span-3">
              <NFTMarketplaceProducts
                favouriteNfts={favouriteNfts}
                setFavouriteNfts={setFavouriteNfts}
                toTopRef={toTopRef}
              />
            </div>
          </div>
        </section>
      </div>
    </InstantSearch>
  )
}

export default NFTMarketplace
