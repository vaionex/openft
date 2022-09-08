import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { searchClientLite as searchClient } from '@/services/algolia'
import { findResultsState } from 'react-instantsearch-dom/server'
import {
  createURL,
  pathToSearchState,
  searchStateToURL,
} from '@/utils/pathUtils'

import SharedLayout from '@/components/layout/shared-layout'

import NFTMarketplace from '@/components/pages-partials/discover/nft-marketplace'
import BannerSection from '@/components/pages-partials/discover/banner'
import Cta from '@/components/pages-partials/discover/cta'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'

const defaultProps = {
  searchClient,
  indexName: 'nfts',
}

const debounceTime = 700
export default function DiscoverPage(props) {
  const { page, seoProps, ...restProps } = props
  const router = useRouter()
  const { currentUser } = useSelector(userSelector)

  const setStateId = React.useRef()
  const [searchState, setSearchState] = useState(
    pathToSearchState(router.asPath),
  )

  const onSearchStateChange = (nextSearchState) => {
    console.log(nextSearchState, 'nextSearchState')

    setStateId.current = setTimeout(() => {
      const newUrl = searchStateToURL(router, nextSearchState)

      router.push(newUrl, newUrl, {
        shallow: true,
      })

      setSearchState(nextSearchState)
    }, debounceTime)
  }

  return (
    <>
      <SharedLayout title="Discover">
        <BannerSection />
        <NFTMarketplace
          {...defaultProps}
          searchState={searchState}
          resultsState={restProps.resultsState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
          currentUser={currentUser}
        />
      </SharedLayout>
      <Cta />
    </>
  )
}

DiscoverPage.getInitialProps = async (context) => {
  const { req, res, query, ...restProps } = context

  const searchState = pathToSearchState(restProps.asPath)
  const resultsState = await findResultsState(NFTMarketplace, {
    ...defaultProps,
    searchState,
  })

  return {
    resultsState,
    searchState,
  }
}
