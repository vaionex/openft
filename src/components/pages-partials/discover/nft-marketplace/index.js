import { useEffect, useRef, useState } from 'react'
import NFTMarketplaceSearch from './search'
import NFTMarketplaceMobileFilters from './mobile-filters'
import NFTMarketplaceFilters from './filters'
import NFTMarketplaceProducts from './products'
import {
  firebaseGetFilteredNftProducts,
  firebaseGetNfts,
  firebaseGetNftsByName,
  firebaseGetSingleDoc,
} from '@/firebase/utils'
import { useMediaQuery } from 'react-responsive'
import userSelector from '@/redux/selectors/user'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import nftSelector from '@/redux/selectors/nft'
import {
  setCurrentPage,
  setLastDoc,
  setNfts,
  setTotalPages,
} from '@/redux/slices/nft'
import queryGenerator from '@/utils/queryGenerator'
import { algoliaIndex } from '@/services/algolia'
import cleanObject from '@/utils/cleanObject'
const NFTMarketplace = () => {
  const toTopRef = useRef(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [favouriteNfts, setFavouriteNfts] = useState()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  })
  const [pageLimit, setPageLimit] = useState(12)
  const { currentUser } = useSelector(userSelector)
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentPage, query } = useSelector(nftSelector)
  const isEmpty = (obj) => Object.keys(obj).length === 0
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    if (!isEmpty(query)) {
      router.replace(`/discover${queryGenerator(cleanObject(query))}`)
    }
  }, [query])
  function createAlgoliaFilter(filterObj) {
    let filters = ['status:live']

    if (filterObj.min !== undefined && filterObj.max !== undefined) {
      filters.push(`amount >= ${filterObj.min} AND amount <= ${filterObj.max}`)
    }
    if (currentUser?.uid) {
      filters.push(`NOT minterId:${currentUser?.uid}`)
    }

    return filters.join(' AND ')
  }
  const updatePagination = async () => {
    setLoading(true)
    // Create price range object based on router.query values
    const priceRange = {
      minPrice: router.query.min || 0,
      maxPrice: router.query.max || Number.MAX_SAFE_INTEGER, // if max is not specified, use max safe integer
    }

    const { nftsData, collectionSize } = await firebaseGetFilteredNftProducts(
      pageLimit,
      currentPage === 0 ? 1 : currentPage,
      priceRange,
    )

    dispatch(setNfts(nftsData))
    dispatch(setTotalPages(Math.ceil(collectionSize / pageLimit)))
    setLoading(false)
  }
  useEffect(async () => {
    console.log('useEffect trigg: ')
    if (isEmpty(router?.query)) {
      setLoading(true)
      const { nftsData, collectionSize } = await firebaseGetNfts(
        pageLimit,
        currentPage === 0 ? 1 : currentPage,
      )
      dispatch(setNfts(nftsData))
      dispatch(setTotalPages(Math.ceil(collectionSize / pageLimit)))
      setLoading(false)
    } else {
      setLoading(true)
      const searchName = router.query.search || '' // Fetch search query value
      const nftsData = await firebaseGetNftsByName(searchName)
      dispatch(setNfts(nftsData))
      setLoading(false)
    }
  }, [currentPage, router?.query, update])

  return (
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
              <NFTMarketplaceFilters update={update} setUpdate={setUpdate} />
            </div>
          )}

          <div className="lg:col-span-3">
            <NFTMarketplaceProducts
              loading={loading}
              favouriteNfts={favouriteNfts}
              setFavouriteNfts={setFavouriteNfts}
              toTopRef={toTopRef}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default NFTMarketplace
