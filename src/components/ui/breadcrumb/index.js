import { HomeIcon } from '@/components/common/icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

// const pages = [
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Project Nero', href: '#', current: true },
// ]

const Breadcrumb = ({ className }) => {
  const router = useRouter()
  const [pages, setPages] = useState([])

  useEffect(() => {
    const routes = router.asPath.split('?')[0].split('/')
    console.log('routes', routes)
    const tempPages = routes.map((path, index) => {
      if (path) {
        return {
          name: path,
          href: '/' + path,
          current: index === routes.length - 1 ? true : false,
        }
      }
    })
    setPages(tempPages)
  }, [router])

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
        {pages.map(
          (page) =>
            page && (
              <li key={page.name}>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <NextLink href={page.href}>
                    <a
                      href={page.href}
                      className="ml-4 text-sm font-medium text-gray-300 hover:text-gray-700"
                      aria-current={page.current ? 'page' : undefined}
                    >
                      {page.name}
                    </a>
                  </NextLink>
                </div>
              </li>
            ),
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumb
