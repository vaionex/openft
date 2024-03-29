import Details from './nft-details'
import apiConfig from '@/config/relysiaApi'
import NextLink from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import TokenDetailGrid from './tokenDetailGrid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CollectionLayout from '@/components/layout/collection-layout'
import usePriceConverter from '@/hooks/usePriceConverter'

const Collection = () => {
  const router = useRouter()
  const [nftId, setNftId] = useState(null)
  const [tokenInfo, setTokenInfo] = useState(null)
  const [collection, setCollection] = useState([])
  const [filteredCollection, setfilteredCollection] = useState([])

  useEffect(() => {
    const {
      query: { current },
    } = router
    if (current) {
      setNftId(current)
    } else {
      setNftId(null)
    }
  }, [router])

  useEffect(() => {
    if (nftId) {
      ;(async () => {
        const { data } = await apiConfig.get(
          `https://api.relysia.com/v1/token/${nftId}`,
        )
        setTokenInfo(data.data)
      })()
    } else {
      setTokenInfo(null)
    }
  }, [nftId])
  const usdBalance = usePriceConverter()

  return (
    <CollectionLayout
      collection={collection}
      setfilteredCollection={setfilteredCollection}
    >
      {tokenInfo ? (
        <>
          <header>
            <div className="px-4 mx-auto max-w-7xl lg:px-8 sm:px-6">
              <div className="py-3">
                <nav className="flex" aria-label="Breadcrumb">
                  <div className="flex sm:hidden">
                    <NextLink href="/user-settings/collection">
                      <a className="inline-flex space-x-3 text-sm font-medium text-gray-400 group hover:text-gray-300">
                        <ArrowLeftIcon
                          className="flex-shrink-0 w-5 h-5 text-gray-300 group-hover:text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Back to Collection</span>
                      </a>
                    </NextLink>
                  </div>
                  <div className="hidden sm:block">
                    <ol role="list" className="flex items-center space-x-4">
                      <li>
                        <div className="flex items-center">
                          <NextLink href="/user-settings/collection">
                            <a
                              className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-600"
                              aria-current={'page'}
                            >
                              <ArrowLeftIcon
                                className="flex-shrink-0 w-5 h-5 text-gray-300 group-hover:text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Collection</span>
                            </a>
                          </NextLink>
                        </div>
                      </li>

                      <li>
                        <div className="flex items-center">
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                          </svg>

                          <NextLink
                            href={`/user-settings/collection?current=${nftId}`}
                          >
                            <a
                              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-600"
                              aria-current={'page'}
                            >
                              {nftId}
                            </a>
                          </NextLink>
                        </div>
                      </li>
                    </ol>
                  </div>
                </nav>
              </div>
            </div>
          </header>
          <Details nft={tokenInfo} />
        </>
      ) : (
        <TokenDetailGrid
          setCollection={setCollection}
          filteredCollection={filteredCollection}
          setfilteredCollection={setfilteredCollection}
          usdBalance={usdBalance}
        />
      )}
    </CollectionLayout>
  )
}

export default Collection
