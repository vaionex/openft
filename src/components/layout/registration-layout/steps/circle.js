import NextLink from 'next/link'
import { CheckIcon } from '@heroicons/react/solid'
import { twMerge } from 'tailwind-merge'

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
            {step.id !== list.length ? (
              <div
                className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                aria-hidden="true"
              />
            ) : null}
            <NextLink href={step.href}>
              <a className="relative flex items-start group">
                <span className="flex items-center h-9">
                  <span
                    className={twMerge(
                      'relative z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full group-hover:bg-blue-800',
                      step.status === 'upcoming'
                        ? 'bg-blue-700 border-2 border-gray-300 rounded-full'
                        : '',
                    )}
                  >
                    {step.status === 'current' && (
                      <span className="h-2.5 w-2.5 bg-blue-700 rounded-full" />
                    )}

                    {step.status === 'upcoming' && (
                      <span className="h-2.5 w-2.5 bg-gray-200 rounded-full group-hover:bg-gray-300" />
                    )}

                    {step.status === 'complete' && (
                      <CheckIcon
                        className="w-5 h-5 text-blue-500"
                        aria-hidden="true"
                      />
                    )}
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
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default CircleSteps
