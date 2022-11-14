import { LeftIcon, RightIcon } from '@/components/common/icons'
import { useRouter } from 'next/router'
import React from 'react'
import getPageNumbers from '@/utils/getPageNumbers'
import NextLink from 'next/link'
import pickBy from 'lodash/pickBy'
import isEmpty from 'lodash/isEmpty'
import qs from 'query-string'

const Pagination = ({ pageLimit, productCount }) => {
  const router = useRouter()
  const query = pickBy({ ...(router.query || {}) }, (q) => !isEmpty(q))
  const currentPage = +router.query.page || 1
  const isLastPage = currentPage * pageLimit >= productCount
  const pageNumbers = getPageNumbers({
    currentPage,
    pageSize: pageLimit,
    total: productCount,
  })

  const path = router.pathname

  const url = (page) => `${path}?${qs.stringify({ ...query, page })}`

  if (productCount === 0) return null

  return (
    <nav>
      <ul className="flex items-center justify-center gap-8 px-4 sm:px-0">
        <li className="flex ">
          {currentPage > 1 ? (
            <NextLink href={url(currentPage - 1)} passHref prefetch={false}>
              <a className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-[#667085]">
                <LeftIcon className="w-5 h-5 " aria-hidden="true" />
                Previous
              </a>
            </NextLink>
          ) : (
            <a
              disabled
              aria-label="No previous page available"
              className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-300 pointer-events-none"
            >
              <LeftIcon className="w-5 h-5 " aria-hidden="true" />
              Previous
            </a>
          )}
        </li>

        {pageNumbers.map((pageNumber) =>
          pageNumber === '...' ? (
            <li
              key={pageNumber}
              className="inline-flex items-center px-4 pt-4 text-sm font-medium text-[#667085]"
            >
              ...
            </li>
          ) : (
            <li key={pageNumber}>
              {pageNumber === currentPage ? (
                <a
                  aria-current="page"
                  className="inline-flex items-center px-4 pt-4 text-sm font-medium text-blue-500 border-t border-blue-500"
                >
                  {pageNumber}
                </a>
              ) : (
                <NextLink href={url(pageNumber)} passHref prefetch={false}>
                  <a className="inline-flex items-center px-4 pt-4 text-sm font-medium text-[#667085]">
                    {pageNumber}
                  </a>
                </NextLink>
              )}
            </li>
          ),
        )}

        <li className="flex justify-end ">
          {!isLastPage ? (
            <NextLink href={url(currentPage + 1)} passHref prefetch={false}>
              <a className="inline-flex items-center pt-4 pl-1 text-sm font-medium text-[#667085]">
                Next
                <RightIcon className="w-5 h-5 " aria-hidden="true" />
              </a>
            </NextLink>
          ) : (
            <a
              disabled
              aria-label="No next page available"
              className="inline-flex items-center pt-4 pl-1 text-sm font-medium text-gray-300 pointer-events-none"
            >
              Next
              <RightIcon className="w-5 h-5 " aria-hidden="true" />
            </a>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
