import { ProductsCarouselCard } from '@/components/ui/cards'
import { connectHits } from 'react-instantsearch-dom'
import NFTMarketplacePagination from '../pagination'

const NFTMarketplaceProducts = ({
  hits,
  favouriteNfts,
  toTopRef,
  setFavouriteNfts,
}) => {
  return (
    <>
      {hits.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {hits.map((hit) => (
              <ProductsCarouselCard
                favouriteNfts={favouriteNfts}
                setFavouriteNfts={setFavouriteNfts}
                key={hit.objectID}
                data={hit}
                type="list"
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

export default connectHits(NFTMarketplaceProducts)
