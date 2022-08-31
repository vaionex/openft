import DiscoverPageMain from '@/components/pages-partials/discover'
import { firebaseGetFirstNfts } from '@/firebase/utils'

export default function DiscoverPage({ nftsData }) {
  return <DiscoverPageMain nftsData={nftsData} />
}

export const getServerSideProps = async () => {
  const pageLimit = 20
  const nftsData = await firebaseGetFirstNfts(pageLimit)

  return {
    props: { nftsData: JSON.parse(JSON.stringify(nftsData)) }
  }
}