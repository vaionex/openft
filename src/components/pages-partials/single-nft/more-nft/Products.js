import React, { useEffect, useState } from 'react'
import { ProductsCarouselCard } from '@/components/ui/cards'
import usePriceConverter from '@/hooks/usePriceConverter'
import { useRouter } from 'next/router'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { firebaseDb } from '@/firebase/init'

const Products = ({ favouriteNfts, setFavouriteNfts }) => {
  const usdBalance = usePriceConverter()
  const [productsArr, setproductsArr] = useState([])

  const router = useRouter()
  const { slug } = router?.query
  useEffect(async () => {
    const nftRef = collection(firebaseDb, 'nfts')

    const queryParams = query(
      nftRef,
      where('tokenId', '!=', slug),
      orderBy('tokenId', 'desc'),
      orderBy('likes', 'desc'),
      limit(3),
    )
    const Snapshots = await getDocs(queryParams)
    setproductsArr(Snapshots?.docs?.map(data => data.data()))

  }, [])
  return (
    <>
      {productsArr.length > 0 ? (
        <>
          {productsArr.map((hit, index) => (
            <ProductsCarouselCard
              favouriteNfts={favouriteNfts}
              setFavouriteNfts={setFavouriteNfts}
              key={hit.objectID}
              data={hit}
              usdBalance={usdBalance}
              type="list"
              view="product"
              index={index}
              setDataArr={setproductsArr}
            />
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          No NFTs found
        </div>
      )}
    </>
  )
}

export default Products
