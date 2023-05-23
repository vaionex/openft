import { TokenCard } from '@/components/ui/cards'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  firebaseGetCollection,
  firebaseGetNftByTokenId,
} from '@/firebase/utils'
import Loader from '@/components/ui/loader/Loader'
import NFTMarketplacePagination from '../../../discover/nft-marketplace/pagination'
import nftSelector from '@/redux/selectors/nft'
import { setTotalPages } from '@/redux/slices/nft'
import useNFTs from '@/hooks/useNFTs'
import userSelector from '@/redux/selectors/user'

const TokenDetailGrid = () => {
  const [collection, setCollection] = useState([])
  const [refresh, setRefresh] = useState(false)
  const toTopRef = useRef(null)
  const { nfts, canLoadMore, loadMore, loading } = useNFTs()
  const { currentUser } = useSelector(userSelector)

  useEffect(() => {
    const fetchData = async () => {
      const { nftsData } = await firebaseGetCollection()
      let data = await firebaseGetNftByTokenId(
        '6242456abb9b5b8c11b253df39a843f34b6e17c1-ku4cBt',
      )
      const merged = mergeData(nftsData, nfts)
      setCollection(merged)
    }

    fetchData()
  }, [nfts, refresh])

  function LoadMoreSection() {
    if (canLoadMore)
      return (
        <div className="flex items-center justify-center">
          <button
            onClick={loadMore}
            type="button"
            className="bg-azul rounded-lg border border-azul text-azul py-2.5 px-2 flex w-40 justify-center items-center font-semibold"
          >
            <span className="text-white">Load More</span>
          </button>
        </div>
      )

    return null
  }

  const mergeData = (data1, data2) => {
    const merged = [...data1]

    data2.forEach((item) => {
      const existingIndex = merged.findIndex((i) => i.tokenId === item.tokenId)
      if (existingIndex > -1) {
        merged[existingIndex] = { ...merged[existingIndex], ...item }
      } else {
        merged.push(item)
      }
    })

    return merged
  }

  return (
    <section
      aria-labelledby="products-heading"
      className="pt-6 pb-24"
      ref={toTopRef}
    >
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>
      {loading ? (
        <div
          className="h-full w-full flex items-center justify-center"
          role="status"
        >
          <Loader />
        </div>
      ) : collection.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {collection.map((item, index) => (
            <TokenCard
              key={index}
              data={item}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          No NFTs found
        </div>
      )}
      {!loading ? (
        <div className="block mt-14">
          <LoadMoreSection />
        </div>
      ) : null}
    </section>
  )
}

export default TokenDetailGrid
