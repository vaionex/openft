import { ProductsCarouselCard } from '@/components/ui/cards'

const FilteredContents = ({ products, favouriteNfts }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products &&
        products.map((item, i) => (
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
