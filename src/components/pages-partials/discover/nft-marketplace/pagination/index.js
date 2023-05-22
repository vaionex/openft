import { LeftIcon, RightIcon } from '@/components/common/icons'
import nftSelector from '@/redux/selectors/nft'
import { setCurrentPage } from '@/redux/slices/nft'
import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'

const NFTMarketplacePagination = ({
  toTopRef,
}) => {
  const dispatch = useDispatch()
  const handlePageClick = (data) => {
    dispatch(setCurrentPage(data.selected + 1))
    toTopRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  const {  totalPage } = useSelector(nftSelector)

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        className="bg-azul rounded-lg border border-azul text-azul py-2.5 px-2 flex w-40 justify-center items-center font-semibold"
      >
        <span className="text-white">Load More</span>
      </button>
    </div>
  )
}

export default NFTMarketplacePagination
