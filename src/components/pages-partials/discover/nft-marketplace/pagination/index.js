import { LeftIcon, RightIcon } from '@/components/common/icons'
import React from 'react'
import { connectPagination } from 'react-instantsearch-dom'
import ReactPaginate from 'react-paginate'

const NFTMarketplacePagination = ({ currentRefinement, nbPages, refine }) => {
  const handlePageClick = (data) => {
    refine(data.selected + 1)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        previousLabel={
          <span className="flex gap-1">
            <LeftIcon
              className="w-5 h-5 hover:text-gray-500"
              aria-hidden="true"
            />
            Previous
          </span>
        }
        nextLabel={
          <span className="flex gap-1">
            Next
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
