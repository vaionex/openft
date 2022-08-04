import SvgArrowIcon from '@/components/common/icons/arrow-icon'
import React, { useEffect, useState } from 'react'

const Pagination = ({
  limitPerPage,
  totalData,
  currentPage,
  handlePageChange,
}) => {
  const [pages, setPages] = useState([])
  useEffect(() => {
    if (totalData && limitPerPage < totalData) {
      setPages(
        [...Array(Math.ceil(totalData / limitPerPage)).keys()].map(
          (item) => item + 1,
        ),
      )
      handlePageChange(1)
    }
  }, [totalData, limitPerPage])

  return (
    <div className="flex flex-col items-center my-12  text-sm">
      <div className="flex text-gray-500">
        <div
          className={`h-12 mr-2 flex justify-center items-center rounded-lg px-2 ${
            currentPage <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        >
          <div className="flex items-center gap-2">
            <SvgArrowIcon direction="left" />
            <span>Previous</span>
          </div>
        </div>
        <div className="hidden md:flex h-12 font-medium rounded-full items-center">
          {pages.length > 6 ? (
            <>
              {pages.slice(0, 3).map((page) => (
                <span
                  key={page}
                  className={`h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 ${
                    currentPage === page ? 'text-gray-800' : 'text-gray-500'
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </span>
              ))}
              <span
                className={`h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 text-gray-500`}
              >
                ...
              </span>
              {pages.slice(pages.at(-3), pages.length).map((page) => (
                <span
                  key={page}
                  className={`h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 ${
                    currentPage === page ? 'text-gray-800' : 'text-gray-500'
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </span>
              ))}
            </>
          ) : (
            pages.map((page) => (
              <span
                key={page}
                className={`h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 ${
                  currentPage === page ? 'text-gray-800' : 'text-gray-500'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </span>
            ))
          )}
        </div>
        <div
          className={`h-12 ml-2 flex justify-center items-center rounded-full ${
            currentPage < Math.ceil(totalData / limitPerPage)
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          }`}
          onClick={() =>
            currentPage < Math.ceil(totalData / limitPerPage) &&
            handlePageChange(currentPage + 1)
          }
        >
          <div className="flex items-center gap-2">
            <span>Next</span>

            <SvgArrowIcon direction="right" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination
