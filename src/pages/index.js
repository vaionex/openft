import HomePageMain from '@/components/pages-partials/home';
import { firebaseGetFirstNfts, firebaseGetNftProducts } from '@/firebase/utils';
import RootLayout from '../components/layout/RootLayout'; // Import RootLayout component
import { useState } from 'react'
import { useEffect } from 'react'
import userSelector from '@/redux/selectors/user'
import { useSelector } from 'react-redux'

export default function HomePage({ nftsData }) {
  const { currentUser } = useSelector(userSelector)
  currentUser?.uid
  let d = nftsData.filter((d) => d.ownerId != currentUser?.uid)
  d = d.slice(0, 10)
  const [productsArr, setproductsArr] = useState([])

  useEffect(() => {
    setproductsArr(d)
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