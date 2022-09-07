import { ProductsCarouselCard } from '@/components/ui/cards'

const NFTProducts = ({ hit }) => {
  // return products.length === 0 ? (
  //   <div className="flex items-center justify-center w-full h-full">
  //     No NFTs found
  //   </div>
  // ) : (
  //   <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
  //     {products.map((item, i) => (
  //       <ProductsCarouselCard
  //         key={item.id}
  //         data={item}
  //         type="list"
  //         idx={i}
  //         favouriteNfts={favouriteNfts}
  //       />
  //     ))}
  //   </div>
  // )

  return (
    <ProductsCarouselCard
      key={hit.uid}
      data={hit}
      type="list"
      // favouriteNfts={favouriteNfts}
    />
  )
}

export default NFTProducts
