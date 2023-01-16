import React, { useState, useEffect } from 'react'
import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { TokenCard } from '@/components/ui/cards'
import useTokens from '@/hooks/useTokens'
import { useRouter } from 'next/router'
import apiConfig from '@/config/relysiaApi'
import NextLink from 'next/link'
import Details from './nft-details'
import { ArrowLeftIcon } from '@heroicons/react/solid'

const Collection = () => {
  const router = useRouter()
  const [nftId, setNftId] = useState(null)
  const [tokenInfo, setTokenInfo] = useState(null)
  const { tokens, canLoadMore, loadMore } = useTokens()

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

  return (
    <UserSettingsLayout>
      <section aria-labelledby="products-heading" className="pt-6 pb-24">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>
        {tokenInfo ? (
          <>
            <header>
              <div className="mx-auto max-w-7xl lg:px-8 sm:px-6 px-4">
                <div className="py-3">
                  <nav className="flex" aria-label="Breadcrumb">
                    <div className="flex sm:hidden">
                      <NextLink href="/user-settings/collection">
                        <a className="group inline-flex space-x-3 text-sm font-medium text-gray-400 hover:text-gray-300">
                          <ArrowLeftIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-300 group-hover:text-gray-400"
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
                                className="flex space-x-2 items-center text-sm font-medium text-gray-500 hover:text-gray-600"
                                aria-current={'page'}
                              >
                                <ArrowLeftIcon
                                  className="h-5 w-5 flex-shrink-0 text-gray-300 group-hover:text-gray-400"
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
                              className="h-5 w-5 flex-shrink-0 text-gray-300"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
            <div className="grid grid-cols-1 gap-x-[29px] gap-y-12 md:grid-cols-2 xl:grid-cols-3 lg:col-span-3">
              {tokens &&
                tokens?.map((token) => (
                  <TokenCard
                    key={token.objectID}
                    data={token}
                    type="list"
                    view="product"
                  />
                ))}
            </div>
          </div>
        )}
      </section>
    </UserSettingsLayout>
  )
}

export default Collection
