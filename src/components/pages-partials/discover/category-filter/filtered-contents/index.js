import { ProductsCarouselCard } from '@/components/ui/cards'
import Pagination from './pagination'

const FilteredContents = ({ nftItems, favouriteNfts }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {nftItems &&
        nftItems.map((item, i) => (
          <ProductsCarouselCard
            key={item.id}
            data={item}
            type="list"
            idx={i}
            favouriteNfts={favouriteNfts}
          />
        ))}
      <Pagination items={nftItems} />
    </div>
  )
}

export default FilteredContents
