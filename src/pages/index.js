import HomePageMain from '@/components/pages-partials/home';
import { firebaseGetFirstNfts, firebaseGetNftProducts } from '@/firebase/utils';
import RootLayout from '../components/layout/RootLayout'; // Import RootLayout component
import { useState } from 'react'
import { useEffect } from 'react'

export default function HomePage({ nftsData }) {
  const [productsArr, setproductsArr] = useState([])

  useEffect(() => {
    console.log('did you came here?')
    setproductsArr(nftsData)
  }, [productsArr])

  return (
    <RootLayout>
      <HomePageMain nftsData={productsArr} setproductsArr={setproductsArr} />
    </RootLayout>
  )
}

export const getServerSideProps = async () => {
  const order = 'likes'
  const pageLimit = 100
  const page = 1
  const { nftsData } = await firebaseGetNftProducts(pageLimit, page)

  return {
    props: { nftsData: nftsData },
  }
}