import { LeftIcon, RightIcon } from '@/components/common/icons'
import React from 'react'
import { connectPagination } from 'react-instantsearch-dom'
import ReactPaginate from 'react-paginate'

const NFTMarketplacePagination = ({
  currentRefinement,
  nbPages,
  refine,
  toTopRef,
}) => {
  const handlePageClick = (data) => {
    refine(data.selected + 1)
    toTopRef.current.scrollIntoView({ behavior: 'smooth' })
  }

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
        pageCount={nbPages}
        onPageChange={handlePageClick}
        breakLabel={'...'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={0}
        containerClassName={'pagination'}
        activeClassName={'active'}
        forcePage={currentRefinement - 1}
      />
    </div>
  )
}

export default connectPagination(NFTMarketplacePagination)
