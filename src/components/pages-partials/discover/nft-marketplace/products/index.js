import React, { useEffect, useState } from 'react'
import { ProductsCarouselCard } from '@/components/ui/cards'
import { connectHits } from 'react-instantsearch-dom'
import NFTMarketplacePagination from '../pagination'
import usePriceConverter from '@/hooks/usePriceConverter'
import { useSelector } from 'react-redux'
import nftSelector from '@/redux/selectors/nft'

const NFTMarketplaceProducts = ({
  hits,
  favouriteNfts,
  toTopRef,
  setFavouriteNfts,

}) => {
  const usdBalance = usePriceConverter()
  const {  nft } = useSelector(nftSelector)

  const [productsArr, setproductsArr] = useState([])
  useEffect(() => {
    if (!!nft)
      setproductsArr(nft)
  }, [nft])
  return (
    <>
      {productsArr.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
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
          </div>
          <div className="block mt-14">
            <NFTMarketplacePagination toTopRef={toTopRef} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          No NFTs found
        </div>
      )}
    </>
  )
}

export default NFTMarketplaceProducts