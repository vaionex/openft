import { ProductsCarouselCard } from '@/components/ui/cards'
import { useState } from 'react'
import Pagination from './pagination'

const FilteredContents = ({ nftItems }) => {

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {nftItems && nftItems.map((item) => (
        <ProductsCarouselCard key={item.id} data={item} />
      ))}
      <Pagination
        items={nftItems}
      />
    </div>
  )
}

export default FilteredContents
