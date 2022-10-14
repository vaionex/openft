import { HeartIcon } from '@heroicons/react/outline'
import { CryptoIcon } from '@/components/common/icons'
import { MagnifyGlassIcon } from '@/components/common/icons'
import { InputMain } from '@/components/ui/inputs'
import React from 'react'
import NextLink from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProductsCarouselCard } from '@/components/ui/cards'
import userSelector from '@/redux/selectors/user'
import { useSelector } from 'react-redux'
import usePriceConverter from '@/hooks/usePriceConverter'
import { firebaseGetSingleDoc } from '@/firebase/utils'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Content({ nftInfo, userFavList }) {
  const usdBalance = usePriceConverter()
  const { currentUser } = useSelector(userSelector)
  const router = useRouter()
  const [favouriteNfts, setFavouriteNfts] = useState()
  const [tabs, setTabs] = useState([
    {
      name: 'Artworks',
      icon: CryptoIcon,
      href: '?current=artworks',
      hrefName: 'artworks',
      status: true,
    },
    {
      name: 'Liked Artworks',
      icon: HeartIcon,
      href: '?current=liked-artworks',
      hrefName: 'liked-artworks',
      status: false,
    },
  ])

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

  useEffect(() => {
    if (router.query.current) {
      const newTabs = tabs.reduce((prev, current) => {
        if (current.hrefName === router.query.current) {
          return [...prev, { ...current, status: true }]
        } else {
          return [...prev, { ...current, status: false }]
        }
      }, [])

      setTabs(newTabs)
    }
  }, [router.query])

  return (
    <div className="px-4 sm:px-6 lg:max-w-7xl lg:px-8 mx-auto">
      <div className="mt-10 flex justify-between items-end sm:flex-row flex-col space-x-7">
        <div className="border-b border-gray-200 pb-5 sm:pb-0 flex-1 sm:order-1 order-2">
          <div className="mt-3 sm:mt-4">
            <div className="sm:hidden">
              <label htmlFor="current-tab" className="sr-only">
                Select a tab
              </label>
              <select
                id="current-tab"
                name="current-tab"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={tabs.find((tab) => tab.status).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <NextLink
                    key={tab.name}
                    href={`/user/${router.query.slug}/${tab.href}`}
                  >
                    <a
                      className={classNames(
                        tab.status
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap flex space-x-2 pb-4 px-1 border-b-2 font-medium text-sm',
                      )}
                      aria-current={tab.status ? 'page' : undefined}
                    >
                      <tab.icon
                        className={classNames(
                          tab.status
                            ? 'text-blue-600 stroke-blue-600'
                            : 'text-gray-500 stroke-gray-500',
                          'w-5 h-5',
                        )}
                        aria-hidden="true"
                      />
                      <span>{tab.name}</span>
                    </a>
                  </NextLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e, searchState)}
          className="flex items-center gap-2 order-1 sm:order:2"
        >
          <InputMain className="relative w-full pb-0 border-none">
            <span className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
              <MagnifyGlassIcon className="w-5 h-5 text-gray-400 " />
            </span>
            <InputMain.Label
              htmlFor="search"
              label="Search"
              className="sr-only"
            />
            <InputMain.Input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              //value={searchState}
              inputClassName="pl-10 h-[36px]"
              //onChange={handleChange}
            />
          </InputMain>
          <button className="p-3 rounded-md btn-primary">
            <span className="sr-only">Search Button</span>
            <MagnifyGlassIcon className="w-4 h-3 text-white" />
          </button>
        </form>
      </div>
      <section aria-labelledby="products-heading" className="pt-6">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 cursor">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 lg:col-span-3">
            {router.query.current == 'liked-artworks' &&
              userFavList &&
              userFavList.nftsData.map((hit) => (
                <ProductsCarouselCard
                  favouriteNfts={favouriteNfts}
                  setFavouriteNfts={setFavouriteNfts}
                  key={hit.objectID}
                  data={hit}
                  usdBalance={usdBalance}
                  type="list"
                />
              ))}
            {!router.query.current ||
              (router.query.current == 'artworks' &&
                nftInfo.nftsData.map((hit) => (
                  <ProductsCarouselCard
                    favouriteNfts={favouriteNfts}
                    setFavouriteNfts={setFavouriteNfts}
                    key={hit.objectID}
                    data={hit}
                    usdBalance={usdBalance}
                    type="list"
                  />
                )))}
          </div>
        </div>
      </section>
    </div>
  )
}
