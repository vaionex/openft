import Details from './nft-details'
import UserSettingsLayout from '@/components/layout/user-settings-layout'
import apiConfig from '@/config/relysiaApi'
import NextLink from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import TokenDetailGrid from './tokenDetailGrid'
import userSelector from '@/redux/selectors/user'
import { useSelector } from 'react-redux'
import { searchClientLite as searchClient } from '@/services/algolia'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Collection = ({ ...restProps }) => {
  const { currentUser } = useSelector(userSelector)

  const router = useRouter()
  const [nftId, setNftId] = useState(null)
  const [tokenInfo, setTokenInfo] = useState(null)
  // const { tokens, canLoadMore, loadMore } = useTokens()

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
        <InstantSearch
          indexName="nfts"
          searchClient={searchClient}
          {...restProps}
        >
          <Configure filters={`ownerId:${currentUser.uid}`} />

          <TokenDetailGrid />
        </InstantSearch>
      )}
    </UserSettingsLayout>
  )
}

export default Collection
