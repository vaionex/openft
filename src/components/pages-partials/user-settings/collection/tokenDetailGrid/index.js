import { TokenCard } from '@/components/ui/cards'
import {  useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseGetCollection } from '@/firebase/utils'
import Loader from '@/components/ui/loader/Loader'
import NFTMarketplacePagination from '../../../discover/nft-marketplace/pagination'
import nftSelector from '@/redux/selectors/nft'
import { setTotalPages } from '@/redux/slices/nft'

const TokenDetailGrid = ({ hits }) => {
  const [collection, setCollection] = useState([])
  const toTopRef = useRef(null)
  const { currentPage } = useSelector(nftSelector)

  const [pageLimit, setPageLimit] = useState(12)
  const [loading, setLoading] = useState(false)
  const products = useMemo(() => collection, [collection])
  
  const dispatch = useDispatch()
  useEffect(async () => {
    setLoading(true)
    const { nftsData, collectionSize } = await firebaseGetCollection(pageLimit, currentPage === 0 ? 1 : currentPage)
    if (nftsData && nftsData?.length) {
      setCollection(nftsData)
      dispatch(setTotalPages(Math.ceil(collectionSize / pageLimit)))
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [currentPage])

  return (
    <section aria-labelledby="products-heading" className="pt-6 pb-24" ref={toTopRef}>
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>
      <>
        {
          {
            true:
              <div className='h-full w-full flex items-center justify-center' role="status">
                <Loader />
              </div >,
            false:
              products.length > 0 ?
                <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((item, index) => (
                    <TokenCard key={index} data={item} />
                  ))}
                </div>
                : <div className="flex items-center justify-center w-full h-full">
                  No NFTs found
                </div>,

          }[loading]
        }
        <div className="block mt-14">
          <NFTMarketplacePagination toTopRef={toTopRef} />
        </div>
      </>
    </section >
  )
}
export default TokenDetailGrid
