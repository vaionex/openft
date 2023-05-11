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
import { useDispatch, useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import { useEffect } from 'react'
import { setDelist } from '@/redux/slices/user'

const defaultProps = {
  searchClient,
  indexName: 'nfts',
}

const debounceTime = 500
export default function DiscoverPage(props) {
  return (
    <>
      <SharedLayout title="Discover">
        <BannerSection />
        <NFTMarketplace />
        <Cta />
      </SharedLayout>
    </>
  )
}


