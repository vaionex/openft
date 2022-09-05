import DiscoverPageMain from '@/components/pages-partials/discover'
import {
  firebaseGetFilteredNftProducts,
  firebaseGetNftProducts,
} from '@/firebase/utils'

export default function DiscoverPage({
  products,
  pageLimit,
  totalPage,
  productCount,
}) {
  return (
    <DiscoverPageMain
      products={products}
      pageLimit={pageLimit}
      totalPage={totalPage}
      productCount={productCount}
    />
  )
}

export const getServerSideProps = async (req, res) => {
  const pageLimit = 9
  const page = +req.query.page || 1
  const minPrice = +req.query.minPrice || 0
  const maxPrice = +req.query.maxPrice || 0
  const isFiltered = minPrice > 0 || maxPrice > 0
  const priceRange = { minPrice, maxPrice }
  let nftProducts = []
  let productCount = 0
  let totalPage = 0

  if (isFiltered) {
    const { nftsData, collectionSize } = await firebaseGetFilteredNftProducts(
      pageLimit,
      page,
      priceRange,
    )
    const products = JSON.parse(JSON.stringify(nftsData))
    nftProducts = [...products]
    productCount = collectionSize
    totalPage = Math.ceil(productCount / pageLimit)
  } else {
    const { nftsData, collectionSize } = await firebaseGetNftProducts(
      pageLimit,
      page,
    )
    const products = JSON.parse(JSON.stringify(nftsData))
    nftProducts = [...products]
    productCount = collectionSize
    totalPage = Math.ceil(productCount / pageLimit)
  }

  return {
    props: {
      products: nftProducts,
      pageLimit,
      totalPage,
      productCount,
    },
  }
}
