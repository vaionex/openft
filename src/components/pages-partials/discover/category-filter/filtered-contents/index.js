import React from 'react'
import CarouselCard from '@/components/ui/cards/carousel-card'
import Pagination from './pagination'

const FilteredContents = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((item) => (
        <CarouselCard key={item.id} data={item} />
      ))}
      <Pagination />
    </div>
  )
}

export default FilteredContents
