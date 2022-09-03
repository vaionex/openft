import DiscoverPageMain from '@/components/pages-partials/discover'
import {
  firebaseGetFilteredNftProducts,
  firebaseGetNftProducts,
} from '@/firebase/utils'

export default function DiscoverPage({ products, pageLimit, totalPage }) {
  return (
    <DiscoverPageMain
      products={products}
      pageLimit={pageLimit}
      totalPage={totalPage}
    />
  )
}

export const getServerSideProps = async (req, res) => {
  const pageLimit = 9
  const page = parseInt(req.query.page) || 1
  const minPrice = parseInt(req.query.minPrice) || 0
  const maxPrice = parseInt(req.query.maxPrice) || 0
  const priceRange = { minPrice, maxPrice }

  const { nftsData, collectionSize } = await firebaseGetNftProducts(
    pageLimit,
    page,
  )
  const products = JSON.parse(JSON.stringify(nftsData))
  const totalPage = Math.ceil(collectionSize / pageLimit)

  let filteredProducts = []
  let filteredProductsSize = 0
  let filteredProductsTotalPage = 0

  if (minPrice || maxPrice) {
    const { nftsData, collectionSize } = await firebaseGetFilteredNftProducts(
      pageLimit,
      page,
      priceRange,
    )
    filteredProducts = JSON.parse(JSON.stringify(nftsData))
    filteredProductsSize = collectionSize
    filteredProductsTotalPage = Math.ceil(filteredProductsSize / pageLimit)
  }

  const nftProducts = filteredProducts.length > 0 ? filteredProducts : products
  const totalPageCount =
    filteredProducts.length > 0 ? filteredProductsTotalPage : totalPage

  return {
    props: {
      products: nftProducts,
      pageLimit,
      totalPage: totalPageCount,
    },
  }
}
