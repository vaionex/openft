import DiscoverPageMain from '@/components/pages-partials/discover'
import {
  firebaseGetFilteredNftProducts,
  firebaseGetNftProducts,
} from '@/firebase/utils'
import { dehydrate, QueryClient } from 'react-query'

export default function DiscoverPage({ pageLimit, isFiltered }) {
  return <DiscoverPageMain pageLimit={pageLimit} isFiltered={isFiltered} />
}

export const getServerSideProps = async (req, res) => {
  const queryClient = new QueryClient()
  const pageLimit = 9
  const page = +req.query.page || 1
  const minPrice = +req.query.minPrice || 0
  const maxPrice = +req.query.maxPrice || 0
  const isFiltered = minPrice > 0 || maxPrice > 0
  const priceRange = { minPrice, maxPrice }

  if (isFiltered) {
    await queryClient.prefetchQuery('nftProducts', () =>
      firebaseGetFilteredNftProducts(pageLimit, page, priceRange),
    )
  } else {
    await queryClient.prefetchQuery('nftProducts', () =>
      firebaseGetNftProducts(pageLimit, page),
    )
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pageLimit,
      isFiltered,
    },
  }
}
