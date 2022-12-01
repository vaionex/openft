import React, { useEffect, useState } from 'react'
import { ProductsCarouselCard } from '@/components/ui/cards'
import { connectHits } from 'react-instantsearch-dom'
import usePriceConverter from '@/hooks/usePriceConverter'

const Products = ({ hits, favouriteNfts, toTopRef, setFavouriteNfts }) => {
  const usdBalance = usePriceConverter()
  const [productsArr, setproductsArr] = useState([])

  useEffect(() => {
    setproductsArr(hits)
  }, [hits])
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

export default connectHits(Products)
