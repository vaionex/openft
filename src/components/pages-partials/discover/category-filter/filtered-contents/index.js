import { ProductsCarouselCard } from '@/components/ui/cards'
import Pagination from './pagination'

const FilteredContents = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((item) => (
        <ProductsCarouselCard key={item.id} data={item} />
      ))}
      <Pagination />
    </div>
  )
}

export default FilteredContents
