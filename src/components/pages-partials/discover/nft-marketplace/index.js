import { useState } from 'react'
import { FilterIcon } from '@heroicons/react/solid'
import { firebaseGetNftProducts, firebaseGetSingleDoc } from '@/firebase/utils'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import NFTMarketplaceSearch from './search'
import NFTMarketplaceMobileFilters from './mobile-filters'
import NFTMarketplaceFilters from './filters'
import { useRouter } from 'next/router'
import Pagination from '@/components/ui/pagination'
import NFTProducts from './products'

const NFTMarketplace = ({ products, pageLimit, totalPage }) => {
  const router = useRouter()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const currentPage = router.query.page ?? 1
  const [filterValues, setFilterValues] = useState({
    minPrice: router.query.minPrice || '',
    maxPrice: router.query.maxPrice || '',
  })
  const [initialSearchValue, setInitialSearchValue] = useState(
    router.query.search || '',
  )

  const handlePagination = async (page) => {
    const currentPath = router.pathname
    const currentQuery = router.query
    const newQuery = {
      ...currentQuery,
      page: page.selected + 1,
    }
    router.push({
      pathname: currentPath,
      query: newQuery,
    })
  }

  const handleSearchChange = (e) => {
    setInitialSearchValue(e.target.value)
  }

  const handleSearchSubmit = (e) => {}

  const handleFilterChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    const currentPath = router.pathname
    const newQuery = {
      page: 1,
      minPrice: filterValues.minPrice,
      maxPrice: filterValues.maxPrice,
    }
    router.push({
      pathname: currentPath,
      query: newQuery,
    })
  }

  const clearFilters = (e) => {
    e.preventDefault()
    setFilterValues({
      minPrice: '',
      maxPrice: '',
    })
    router.push({
      pathname: router.pathname,
      query: {
        page: 1,
      },
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
            <NFTMarketplaceSearch
              initialSearchValue={initialSearchValue}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
            />

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
                <NFTMarketplaceFilters
                  filterValues={filterValues}
                  onChange={handleFilterChange}
                  onSubmit={handleFilterSubmit}
                  clearFilters={clearFilters}
                />
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="h-full">
                  <NFTProducts products={products} />
                </div>
                <Pagination
                  onPageChange={handlePagination}
                  totalPage={totalPage}
                  currentPage={currentPage}
                  forcePage={currentPage - 1}
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
