import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { MoreFilterIcon } from '@/components/common/icons'
import {
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  SearchIcon,
} from '@heroicons/react/solid'

import FilteredContents from './filtered-contents'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 6,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
]

export default function CategoryFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('buy-now')

  const statusHandle = (e) => {
    e.preventDefault()
    setCurrentStatus(e.target.value)
  }

  return (
    <div className="bg-white">
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
                  <form className="mt-4 px-2">
                    <h3 className="sr-only">Categories</h3>
                    <div className="flex flex-col space-y-2">
                      <div className="rounded-md">
                        <button className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white border border-transparent rounded-md btn-primary 0 md:text-lg">
                          Buy now
                        </button>
                      </div>
                      <div className="rounded-md">
                        <button className="btn-primary text-white flex items-center justify-center w-full px-5 py-3 text-base font-medium border border-transparent rounded-md 0 md:text-lg">
                          On auction
                        </button>
                      </div>
                    </div>
                    <h3 className="mt-5">Price (BSV)</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price-first" className="sr-only">
                          Price First
                        </label>
                        <input
                          type="text"
                          name="price-first"
                          id="price-first"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Any price"
                        />
                      </div>
                      <div>
                        <label htmlFor="price-second" className="sr-only">
                          Price Second
                        </label>
                        <input
                          type="text"
                          name="price-second"
                          id="price-second"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Any price"
                        />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-6 gap-4">
                      <button
                        className={`col-span-2 flex items-center justify-center text-gray-600 w-full px-5 py-3 text-base font-medium border border-gray-200 rounded-md md:text-lg`}
                      >
                        Clear
                      </button>
                      <button className="col-span-4 flex items-center justify-center btn-primary text-white w-full px-5 py-3 text-base font-medium border border-transparent rounded-md md:text-lg">
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
            <div className="flex space-x-2 w-full col-span-9">
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
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search"
                  />
                </div>
              </div>
              <button className="p-2 w-12 btn-primary rounded-md">
                <SearchIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
            </div>

            <div className="col-span-3 flex justify-end items-center">
              <button className="p-2.5 md:p-1.5 flex space-x-2 justify-center items-center rounded-md border border-gray-200">
                <MoreFilterIcon className="w-5 h-5" aria-hidden="true" />
                <span className="hidden md:block">More filters</span>
              </button>
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
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <div className="flex flex-col py-2 px-2 border border-gray-200 bg-blue-500/5 rounded-md">
                  <div className="rounded-md">
                    <button
                      value={'buy-now'}
                      onClick={(e) => statusHandle(e)}
                      className={`flex items-center justify-start ${
                        currentStatus === 'buy-now'
                          ? 'btn-primary text-white'
                          : 'text-gray-600'
                      } w-full px-5 py-3 text-base font-medium border border-transparent rounded-md md:text-lg`}
                    >
                      Buy now
                    </button>
                  </div>
                  <div className="rounded-md">
                    <button
                      value={'on-auction'}
                      onClick={(e) => statusHandle(e)}
                      className={`flex items-center justify-start ${
                        currentStatus === 'on-auction'
                          ? 'btn-primary text-white'
                          : 'text-gray-600'
                      } w-full px-5 py-3 text-base font-medium border border-transparent rounded-md md:text-lg`}
                    >
                      On auction
                    </button>
                  </div>
                </div>
                <h3 className="mt-5">Price (BSV)</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price-first" className="sr-only">
                      Price First
                    </label>
                    <input
                      type="text"
                      name="price-first"
                      id="price-first"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Any price"
                    />
                  </div>
                  <div>
                    <label htmlFor="price-second" className="sr-only">
                      Price Second
                    </label>
                    <input
                      type="text"
                      name="price-second"
                      id="price-second"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Any price"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-6 gap-4">
                  <button
                    className={`col-span-2 flex items-center justify-center text-gray-600 w-full px-5 py-3 text-base font-medium border border-gray-200 rounded-md md:text-lg`}
                  >
                    Clear
                  </button>
                  <button className="col-span-4 flex items-center justify-center btn-primary text-white w-full px-5 py-3 text-base font-medium border border-transparent rounded-md md:text-lg">
                    Apply filter
                  </button>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <div className="h-full">
                  <FilteredContents products={products} />
                </div>
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
