import HomePageMain from '@/components/pages-partials/home'
import { firebaseGetFirstNfts, firebaseGetNftProducts } from '@/firebase/utils'

export default function HomePage({ nftsData }) {
  return <HomePageMain nftsData={nftsData} />
}

export const getServerSideProps = async () => {
  const order = 'likes'
  const pageLimit = 10
  const page = 1
  const { nftsData } = await firebaseGetNftProducts(pageLimit, page, order)

  return {
    props: { nftsData: JSON.parse(JSON.stringify(nftsData)) },
  }
}
