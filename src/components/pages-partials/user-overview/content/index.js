import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import { CryptoIcon, LeftIcon, RightIcon } from '@/components/common/icons'
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
import _ from 'lodash'
import ReactPaginate from 'react-paginate'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const itemsPerPage = 9

export default function Content({
  nftInfo,
  userInfo,
  userFavList,
  isUserDetails,
}) {
  const usdBalance = usePriceConverter()
  const { currentUser } = useSelector(userSelector)
  const router = useRouter()
  const [favouriteNfts, setFavouriteNfts] = useState()
  const [searchState, setsearchState] = useState('')
  const [filteredNfts, setFilteredNfts] = useState([])
  const [favFilteredNfts, setFavFilteredNfts] = useState(
    userFavList?.nftsData || [],
  )
  const [itemOffset, setItemOffset] = useState(0)
  const [tabs, setTabs] = useState([
    {
      name: 'Artworks',
      icon: CryptoIcon,
      href: userInfo?.uid == router.query.id ? '?type=id' : '?current=artworks',
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

  const pageCount = Math.ceil(nftInfo?.nftsData?.length / itemsPerPage)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    const currentItems = nftInfo?.nftsData?.slice(itemOffset, endOffset)
    setFilteredNfts(currentItems)
    setFavFilteredNfts(userFavList?.nftsData)
  }, [itemOffset, nftInfo?.nftsData, searchState])

  const removeAllSpaces = (str) => str?.replace(/\s+/g, '')

  const handleSubmit = (e) => {
    e.preventDefault()
    let searchQuery = removeAllSpaces(searchState)?.toLowerCase()
    if (searchState) {
      const filtered = _.filter(filteredNfts, (ele) => {
        return _.includes(
          removeAllSpaces(ele?.name)?.toLowerCase(),
          searchQuery,
        )
      })
      const favFiltered = _.filter(userFavList.nftsData, (ele) => {
        return (
          _.includes(removeAllSpaces(ele?.name)?.toLowerCase(), searchQuery) ||
          (ele.username &&
            _.includes(
              removeAllSpaces(ele?.username)?.toLowerCase(),
              searchQuery,
            ))
        )
      })
      setFavFilteredNfts(favFiltered)
      setFilteredNfts(filtered)
    } else {
      setFavFilteredNfts(userFavList.nftsData)
      setFilteredNfts(nftInfo.nftsData)
    }
  }

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
    if (router.query.current || router.query.type == 'id') {
      const newTabs = tabs.reduce((prev, current) => {
        if (
          current.hrefName === router.query.current ||
          current.href.includes(router.query.type)
        ) {
          return [...prev, { ...current, status: true }]
        } else {
          return [...prev, { ...current, status: false }]
        }
      }, [])

      setTabs(newTabs)
    }
  }, [router.query])

  const switchTab = (href) => {
    router.push(`/user/${router.query.slug}/${href}`)
  }

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % nftInfo?.nftsData?.length
    setItemOffset(newOffset)
  }
  return (
    <div className="px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex flex-col items-end justify-between mt-10 sm:flex-row space-x-7">
        <div className="flex-1 order-2 pb-5 border-b border-gray-200 sm:pb-0 sm:order-1">
          <div className="mt-3 sm:mt-4">
            <div className="sm:hidden">
              <label htmlFor="current-tab" className="sr-only">
                Select a tab
              </label>
              <select
                id="current-tab"
                name="current-tab"
                className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={tabs.find((tab) => tab.status)?.name}
                onChange={(e) => switchTab(e.target.value)}
              >
                {tabs.map((tab) => (
                  <option key={tab.name} value={tab.href}>
                    {tab.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex -mb-px space-x-8">
                {tabs.map((tab) => (
                  <NextLink
                    key={tab.name}
                    href={`/user/${router.query.slug}/${tab.href}`}
                  >
                    <a
                      className={classNames(
                        tab.status
                          ? 'border-blue-500 text-azul'
                          : 'border-transparent text-river-bed hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap flex space-x-2 pb-4 px-1 border-b-2 font-medium text-sm',
                      )}
                      aria-current={tab.status ? 'page' : undefined}
                    >
                      <tab.icon
                        className={classNames(
                          tab.status
                            ? 'text-azul stroke-blue-600'
                            : 'text-river-bed stroke-gray-500',
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
          onSubmit={(e) => handleSubmit(e)}
          className="flex items-center order-1 gap-2 sm:order:2"
        >
          <InputMain className="relative w-full md:min-w-[329px] pb-0 border-none">
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
              value={searchState}
              inputClassName="pl-10 h-[44px]"
              onChange={(e) => setsearchState(e.target.value)}
            />
          </InputMain>
          <button className="p-[14px] rounded-md bg-azul hover:bg-ultramarine">
            <span className="sr-only">Search Button</span>
            <MagnifyGlassIcon className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
      <section aria-labelledby="products-heading" className="pt-12 pb-24">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 cursor">
          <div className="grid grid-cols-1 gap-x-[29px] gap-y-12 md:grid-cols-2 xl:grid-cols-3 lg:col-span-3">
            {router.query.current === 'liked-artworks' &&
              favFilteredNfts &&
              favFilteredNfts.map((hit, index) => (
                <ProductsCarouselCard
                  isUserDetails
                  favouriteNfts={favouriteNfts}
                  setFavouriteNfts={setFavouriteNfts}
                  key={index + 'fav'}
                  data={hit}
                  usdBalance={usdBalance}
                  type="list"
                  view="product"
                />
              ))}
            {(router.query.current === undefined ||
              router.query.current === 'artworks') &&
              filteredNfts?.map((hit, index) => {
                if (hit.likes == 0) {
                  return (
                    <ProductsCarouselCard
                      isUserDetails
                      favouriteNfts={favouriteNfts}
                      setFavouriteNfts={setFavouriteNfts}
                      key={index + 'nor'}
                      data={hit}
                      usdBalance={usdBalance}
                      type="list"
                      view="product"
                    />
                  )
                }
              })}
          </div>
        </div>
        {filteredNfts.length > 0 ? (
          <div className="flex justify-center w-full mt-12 pagination-wrapper">
            <ReactPaginate
              breakLabel={'...'}
              nextLabel={
                <span className="flex gap-1 text-mist">
                  Next
                  <RightIcon
                    className="w-5 h-5 hover:text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              }
              onPageChange={handlePageClick}
              pageCount={pageCount}
              previousLabel={
                <span className="flex gap-1 text-mist">
                  <LeftIcon
                    className="w-5 h-5 hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Previous
                </span>
              }
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              pageRangeDisplayed={0}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        ) : null}
        {filteredNfts?.length == 0 || favFilteredNfts?.length == 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            No NFTs found
          </div>
        ) : null}
      </section>
    </div>
  )
}
