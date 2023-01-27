import { TokenCard } from '@/components/ui/cards'
import { useMemo } from 'react'
import { connectHits } from 'react-instantsearch-dom'

const TokenDetailGrid = ({ hits }) => {
  const products = useMemo(() => hits, [hits])

  return (
    <section aria-labelledby="products-heading" className="pt-6 pb-24">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
        <div className="grid grid-cols-1 gap-x-[29px] gap-y-12 md:grid-cols-2 xl:grid-cols-3 lg:col-span-3">
          {products?.map((item, idx) => (
            <TokenCard key={idx} data={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default connectHits(TokenDetailGrid)
