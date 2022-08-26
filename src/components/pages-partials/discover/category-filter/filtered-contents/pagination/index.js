/* This example requires Tailwind CSS v2.0+ */
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

export default function Pagination({
  items,
  initialPage = 1,
  pageItems = 9,
  loadDataStep,
  onChangePage,
  addItems,
  isPagination,
  lastAddPage,
  isFilter
}) {
  const [pager, setPager] = useState({})

  useEffect(() => {
    if (items) {
      setPage(initialPage)
    }
  }, [isFilter])

  useEffect(() => {
    if (
      !isPagination &&
      pager?.currentPage % loadDataStep === 0 &&
      pager?.currentPage > lastAddPage
    ) {
      addItems(pager?.currentPage)
    }
  }, [pager])

  const setPage = (page) => {
    let pager = page
    if (page < 1 || page > pager?.totalPages) {
      return
    }
    pager = getPager(items?.length, page)
    console.log('pager', pager)
    let pageOfItems = items?.slice(pager?.startIndex, pager?.endIndex + 1)
    setPager(pager)
    onChangePage(pageOfItems)
  }

  const getPager = (totalItems, currentPage, pageSize) => {
    currentPage = currentPage || 1

    pageSize = pageSize || pageItems

    let totalPages = Math.ceil(totalItems / pageSize)

    let startPage, endPage
    if (totalPages <= 10) {
      startPage = 1
      endPage = totalPages
    } else {
      if (currentPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9
        endPage = totalPages
      } else {
        startPage = currentPage - 5
        endPage = currentPage + 4
      }
    }

    let startIndex = (currentPage - 1) * pageSize
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

    let pages = [...Array(endPage + 1 - startPage).keys()]?.map(
      (i) => startPage + i,
    )

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    }
  }
  if (!pager?.pages || pager?.pages.length <= 1) {
    return null
  }

  const onPrevious = () => {
    window.scrollTo(top)
    if (pager?.currentPage === 1) {
      return null
    }
    setPage(pager?.currentPage - 1)
  }

  const onNext = () => {
    window.scrollTo(top)
    if (pager?.currentPage === pager?.totalPages) {
      return null
    }
    setPage(pager?.currentPage + 1)
  }

  const onNextpage = (page) => {
    window.scrollTo(top)
    setPage(page)
  }

  return (
    <nav className="px-4 col-span-1 md:col-span-2 xl:col-span-3 flex items-center justify-center sm:px-0 ">
      <div className="flex">
        <button
          disabled={pager?.currentPage === 1}
          onClick={() => onPrevious()}
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <ArrowNarrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pager?.pages?.map((page, index) => (
          <button
            key={index}
            onClick={() => onNextpage(page)}
            className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium 
            ${pager?.currentPage === page ? 'text-gray-700 border-gray-300 ' : ''}`}
          >
            {page}
          </button>
        ))}
        {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => onNext()}
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          Next
          <ArrowNarrowRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  )
}
