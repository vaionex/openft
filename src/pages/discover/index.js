import DiscoverPageMain from '@/components/pages-partials/discover'
import { firebaseGetFirstNfts } from '@/firebase/utils'

export default function DiscoverPage({ nftsData }) {
  return <DiscoverPageMain nftsData={nftsData} />
}

export const getServerSideProps = async () => {
  const nftsData = await firebaseGetFirstNfts()

  return {
    props: { nftsData: JSON.parse(JSON.stringify(nftsData)) }
  }
}