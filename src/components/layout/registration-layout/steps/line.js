/* This example requires Tailwind CSS v2.0+ */

import NextLink from 'next/link'

export default function LineSteps({ list }) {
  return (
    <nav className="px-4 sm:px-0" aria-label="Progress">
      <ol role="list" className="flex max-w-md mx-auto space-x-8 space-y-0 ">
        {list.map((step) => (
          <li key={step.name} className="flex-1">
            {step.status === 'current' ? (
              <span
                className="flex flex-col py-1 pl-2 bg-blue-600 rounded-full hover:border-gray-300 md:pl-0 md:pt-2 md:pb-0"
                aria-current="step"
              ></span>
            ) : (
              <span className="flex flex-col py-1 pl-2 bg-gray-300 rounded-full group hover:border-gray-300 md:pl-0 md:pt-2 md:pb-0"></span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
