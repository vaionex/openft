/* This example requires Tailwind CSS v2.0+ */
import NextLink from 'next/link'
import { CheckIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CircleSteps = ({ list }) => {
  return (
    <nav className="mt-20" aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {list.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== list.length - 1 ? 'pb-10' : '',
              'relative',
            )}
          >
            {step.status === 'complete' ? (
              <>
                {stepIdx !== list.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-blue-500"
                    aria-hidden="true"
                  />
                ) : null}
                <NextLink href={step.href}>
                  <a
                    href={step.href}
                    className="relative flex items-start group"
                  >
                    <span className="flex items-center h-9">
                      <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full group-hover:bg-blue-800">
                        <CheckIcon
                          className="w-5 h-5 text-blue-500"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="flex flex-col min-w-0 ml-4">
                      <span className="font-medium tracking-wide text-white">
                        {step.name}
                      </span>
                      <span className="text-sm text-blue-200">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </NextLink>
              </>
            ) : step.status === 'current' ? (
              <>
                {stepIdx !== list.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <NextLink href={step.href}>
                  <a
                    className="relative flex items-start group"
                    aria-current="step"
                  >
                    <span className="flex items-center h-9" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-blue-700 rounded-full">
                        <span className="h-2.5 w-2.5 bg-blue-500 rounded-full" />
                      </span>
                    </span>
                    <span className="flex flex-col min-w-0 ml-4">
                      <span className="font-medium tracking-wide text-white">
                        {step.name}
                      </span>
                      <span className="text-sm text-blue-200">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </NextLink>
              </>
            ) : (
              <>
                {stepIdx !== list.length - 1 ? (
                  <div
                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <NextLink href={step.href}>
                  <a className="relative flex items-start group">
                    <span className="flex items-center h-9" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 bg-gray-200 rounded-full group-hover:bg-gray-300" />
                      </span>
                    </span>
                    <span className="flex flex-col min-w-0 ml-4">
                      <span className="font-medium tracking-wide text-white">
                        {step.name}
                      </span>
                      <span className="text-sm text-blue-200">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </NextLink>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default CircleSteps
