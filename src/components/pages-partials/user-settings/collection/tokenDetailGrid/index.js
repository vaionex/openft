import { TokenCard } from '@/components/ui/cards'
import { useEffect, useMemo, useState } from 'react'
import { connectHits } from 'react-instantsearch-dom'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import { firebaseGetCollection } from '@/firebase/utils'
import InfiniteScroll from "react-infinite-scroller";
import Loader from '@/components/ui/loader/Loader'

const TokenDetailGrid = ({ hits }) => {
  const [collection, setCollection] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [startAfter, setStartAfter] = useState()
  console.log("🚀 ~ file: index.js:15 ~ TokenDetailGrid ~ startAfter:", startAfter)
  const products = useMemo(() => collection, [collection])
  const { currentUser, isAuthenticated, isUserPending, mnemonicPopup } =
    useSelector(userSelector)
  useEffect(async () => {
    setLoading(true)
    const { data, startAFterParams } = await firebaseGetCollection(currentUser?.uid, page, startAfter)
    console.log("🚀 ~ file: index.js:22 ~ useEffect ~ startAFterParams:", startAFterParams)
    if (data) {
      // const uniqueData = _.uniqBy([...data, ...collection], "tokenId");

      setCollection(data)
      // setCollection(uniqueData)
      setLoading(false)
      // setStartAfter(startAFterParams)

    } else {
      setHasMore(false)
    }
  }, [])
  // }, [page])
  const loadMore = () => {
    if (!loading) {
      setPage(page + 1)
    }
  }
  return (
    <section aria-labelledby="products-heading" className="pt-6 pb-24">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>
      {
        {
          true:
            <div className='h-full w-full flex items-center justify-center' role="status">
              <Loader />
            </div >,
          false:
            products.length > 0 ?
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
                <InfiniteScroll
                  element={"div"}
                  className="grid grid-cols-1 gap-x-[29px] gap-y-12 md:grid-cols-2 xl:grid-cols-3 lg:col-span-3"
                  key="componentA"
                  initialLoad={false}
                  useWindow={true}
                  dataLength={products.length}
                  // loadMore={loadMore}
                  hasMore={hasMore}
                // threshold={10}
                >

                  {products?.map((item, idx) => (
                    <TokenCard key={idx} data={item} />
                  ))}
                </InfiniteScroll>
              </div>
              : <div className="flex items-center justify-center w-full h-full">
                No NFTs found
              </div>,

        }[loading]
      }

    </section>
  )
}
export default TokenDetailGrid
