import { LeftIcon, RightIcon } from '@/components/common/icons'
import { ArrowNarrowRightIcon } from '@heroicons/react/outline'
import React from 'react'
import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({ onPageChange, totalPage, currentPage, forcePage }) => {
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
        pageCount={totalPage}
        onPageChange={onPageChange}
        // onClick={onPageChange}
        breakLabel={'...'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={0}
        containerClassName={'pagination'}
        activeClassName={'active'}
        initialPage={currentPage - 1}
        forcePage={forcePage}
      />
    </div>
  )
}

export default Pagination
