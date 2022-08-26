import HomePageMain from '@/components/pages-partials/home'
import { firebaseGetFirstNfts } from '@/firebase/utils'

export default function HomePage({ nftsData }) {
  return <HomePageMain nftsData={nftsData} />
}

export const getServerSideProps = async () => {
  const order = 'likes'
  const pageLimit = 10
  const nftsData = await firebaseGetFirstNfts(pageLimit, order)

  return {
    props: { nftsData: JSON.parse(JSON.stringify(nftsData)) }
  }
}
