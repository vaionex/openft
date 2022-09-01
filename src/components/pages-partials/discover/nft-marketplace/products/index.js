import { ProductsCarouselCard } from '@/components/ui/cards'

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
    </div>
  )
}

export default FilteredContents
