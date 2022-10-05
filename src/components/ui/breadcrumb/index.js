import { HomeIcon } from '@/components/common/icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]

const Breadcrumb = ({ className, pages }) => {
  const router = useRouter()

  // LATER
  // we will generate the breadcrumb based on the current route

  return (
    <nav className={twMerge('flex', className)} aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <NextLink href="/">
            <a className="text-gray-300 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </NextLink>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#fff"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <NextLink href={page.href}>
                <a
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-300 hover:text-gray-400"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </a>
              </NextLink>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
