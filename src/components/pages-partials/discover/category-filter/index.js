import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { MoreFilterIcon } from '@/components/common/icons'
import {
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import {
  firebaseGetFilterNfts,
  firebsaeFetchNextData,
  firebaseGetSingleDoc
} from '@/firebase/utils'
import { useSelector } from 'react-redux'
import FilteredContents from './filtered-contents'
import Pagination from './filtered-contents/pagination'
import authSelector from '@/redux/selectors/auth'

export default function CategoryFilter({ nftsData }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('buy-now')
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: '',
    max: ''
  })
  const [nfts, setNfts] = useState(nftsData)
  const [pageOfItems, setPageOfItems] = useState(null)
  const [lastAddPage, setLastAddPage] = useState(null)
  const [isFilter, setIsFilter] = useState(false)
  const [isPagination, setIsPagination] = useState(false)
  const [favouriteNfts, setFavouriteNfts] = useState(null)

  const { user } = useSelector(authSelector)

  useEffect(async () => {
    if (user) {
      const data = await firebaseGetSingleDoc("favourites", user?.uid)
      setFavouriteNfts(data?.nfts)
    } else {
      setFavouriteNfts([])
    }
  }, [user])

  const statusHandle = (e) => {
    e.preventDefault()
    setCurrentStatus(e.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSelectedPriceRange((price) => ({ ...price, [name]: value }))
  }

  const onApplyFilter = async () => {
    try {
      const data = await firebaseGetFilterNfts(selectedPriceRange)
      setNfts(data)
      setMobileFiltersOpen(false)
      setIsFilter(true)
    } catch (err) {
      console.log(err)
      setMobileFiltersOpen(false)
      setIsFilter(false)
    }
  }

  const onClearHandler = () => {
    setSelectedPriceRange({
      min: "",
      max: ""
    });
    setIsFilter(false)
    setMobileFiltersOpen(false)
    setNfts(nftsData)
  };

  const onChangePage = (newPage) => {
    setPageOfItems(newPage);
  }

  const loadMoreData = async () => {
    setIsPagination(true)
    const item = pageOfItems[pageOfItems?.length - 1]
    const newNfts = isFilter
      ? await firebaseGetFilterNfts(selectedPriceRange)
      : await firebsaeFetchNextData(item)
    newNfts?.length > 0 && setNfts((item) => ([...item, ...newNfts]))
    setIsPagination(false)
  }

  const addItems = async (page) => {
    if (page === 1 || nftsData?.length < 9) {
      return null
    }
    setLastAddPage(page)
    loadMoreData()
  }

  return (
    <div>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 px-2" onSubmit={(e) => e.preventDefault()}>
                    <h3 className="sr-only">Categories</h3>

                    <h3 className="mt-5">Price (BSV)</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price-first" className="sr-only">
                          Price First
                        </label>
                        <input
                          type="text"
                          name="min"
                          id="price-first"
                          className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="$ Min price"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="price-second" className="sr-only">
                          Price Second
                        </label>
                        <input
                          type="text"
                          name="max"
                          id="price-second"
                          className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="$ Max price"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-6 gap-4">
                      <button
                        className={`col-span-2 flex items-center justify-center text-gray-600 w-full px-5 py-3 text-base font-medium border border-gray-200 hover:bg-gray-50 rounded-md md:text-lg`}
                        onClick={() => onClearHandler()}
                      >
                        Clear
                      </button>
                      <button className="col-span-4 flex items-center justify-center btn-primary text-white w-full px-5 py-3 text-base font-medium border border-transparent rounded-md md:text-lg"
                        onClick={() => onApplyFilter()}
                      >
                        Apply filter
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 grid grid-cols-12 gap-4 pt-24 pb-6 ">
            <div className="flex space-x-2 w-full col-span-10 sm:col-span-11 lg:col-span-12">
              <div className="w-full">
                <label
                  htmlFor="search"
                  className="sr-only block text-sm font-medium text-gray-700"
                >
                  Search
                </label>
                <div className="relative rounded-md shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="focus:ring-blue-600 focus:border-blue-600 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search"
                  />
                </div>
              </div>
              <button className="p-2 w-12 btn-primary rounded-md">
                <SearchIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
            </div>

            <div className="col-span-2 sm:col-span-1 flex justify-end items-center">
              <button
                type="button"
                className="p-2  text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block" onSubmit={(e) => e.preventDefault()}>
                <h3 className="sr-only">Categories</h3>
                <h3>Price (BSV)</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price-first" className="sr-only">
                      Price First
                    </label>
                    <input
                      type="number"
                      name="min"
                      id="price-first"
                      className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="$ Min Price"
                      value={selectedPriceRange.min}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="price-second" className="sr-only">
                      Price Second
                    </label>
                    <input
                      type="number"
                      name="max"
                      id="price-second"
                      className="shadow-sm focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="$ Max price"
                      value={selectedPriceRange.max}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-6 gap-4">
                  <button
                    className={`col-span-2 flex items-center justify-center text-gray-600 w-full px-5 py-3 text-base font-medium border border-gray-200 hover:bg-gray-50 rounded-md md:text-lg`}
                    onClick={() => onClearHandler()}
                  >
                    Clear
                  </button>
                  <button className="col-span-4 flex items-center justify-center btn-primary text-white w-full px-5 py-3 text-base font-medium border border-transparent rounded-md md:text-lg"
                    onClick={() => onApplyFilter()}
                  >
                    Apply filter
                  </button>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="h-full">
                  <FilteredContents
                    favouriteNfts={favouriteNfts}
                    nftItems={pageOfItems}
                  />
                </div>
                <Pagination
                  items={nfts}
                  onChangePage={onChangePage}
                  addItems={addItems}
                  lastAddPage={lastAddPage}
                  isFilter={isFilter}
                  isPagination={isPagination}
                  loadDataStep={10}
                  pageItems={9}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
