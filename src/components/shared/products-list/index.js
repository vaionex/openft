import React from 'react'
import ProductCard from '../product'

const ProductsList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </div>
  )
}

export default ProductsList
