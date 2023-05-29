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
  const { totalPage } = useSelector(nftSelector)

  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        previousLabel={
          <span className="flex gap-1 text-mist">
            <LeftIcon
              className="w-5 h-5 hover:text-gray-500"
              aria-hidden="true"
            />
            <span className="hidden sm:block">Previous</span>
          </span>
        }
        nextLabel={
          <span className="flex gap-1 text-mist">
            <span className="hidden sm:block">Next</span>
            <RightIcon
              className="w-5 h-5 hover:text-gray-500"
              aria-hidden="true"
            />
          </span>
        }
        pageCount={totalPage}
        onPageChange={handlePageClick}
        breakLabel={'...'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={0}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default NFTMarketplacePagination
