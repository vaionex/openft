import DiscoverPageMain from '@/components/pages-partials/discover'
import { firebaseGetNftProducts } from '@/firebase/utils'

export default function DiscoverPage({ nftsData, collectionSize, limit }) {
  return (
    <DiscoverPageMain
      nftsData={nftsData}
      nftCollectionSize={collectionSize}
      nftLimit={limit}
    />
  )
}

export const getServerSideProps = async (req, res) => {
  const pageLimit = 9
  const page = req.query.page || 1

  const { nftsData, collectionSize } = await firebaseGetNftProducts(
    pageLimit,
    page,
  )
  const parsedData = JSON.parse(JSON.stringify(nftsData))

  return {
    props: { nftsData: parsedData, collectionSize, limit: pageLimit },
  }
}
