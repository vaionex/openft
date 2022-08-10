/* This example requires Tailwind CSS v2.0+ */

import NextLink from 'next/link'

export default function LineSteps({ list }) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className=" max-w-md mx-auto flex space-y-0 space-x-8">
        {list.map((step) => (
          <li key={step.name} className="flex-1">
            {step.status === 'current' ? (
              <NextLink href={step.href}>
                <a
                  className="pl-2 py-1 flex flex-col hover:border-gray-300 md:pl-0 md:pt-2 md:pb-0 bg-blue-600 rounded-full"
                  aria-current="step"
                ></a>
              </NextLink>
            ) : (
              <NextLink href={step.href}>
                <a className="group pl-2 py-1 flex flex-col hover:border-gray-300 md:pl-0 md:pt-2 md:pb-0 bg-gray-300 rounded-full"></a>
              </NextLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
