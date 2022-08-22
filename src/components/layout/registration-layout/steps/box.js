import { CheckIcon } from '@heroicons/react/solid'
import { twMerge } from 'tailwind-merge'

const BoxSteps = ({ list, goToStep }) => {
  return (
    <div className="block md:hidden lg:border-t lg:border-b lg:border-gray-200">
      <nav className="px-4 mx-auto max-w-7xl sm:px-0" aria-label="Progress">
        <ol
          role="list"
          className="overflow-hidden rounded-md lg:flex lg:border-l lg:border-r lg:border-gray-200 lg:rounded-none"
        >
          {list?.map((step, stepIdx) => (
            <li key={step.id} className="relative overflow-hidden lg:flex-1">
              <div
                className={twMerge(
                  'border border-gray-200 overflow-hidden lg:border-0',
                  step.status === 'upcoming' && 'bg-gray-50',
                  step.status === 'completed'
                    ? 'cursor-pointer'
                    : 'pointer-events-none cursor-default touch-none',
                )}
                onClick={
                  step.status === 'completed'
                    ? () => goToStep(step.id)
                    : () => {}
                }
              >
                <span aria-current="step">
                  <span
                    className={twMerge(
                      'absolute top-0 left-0 w-1 h-full bg-transparent lg:w-full lg:h-1 lg:bottom-0 lg:top-auto',
                      step.status === 'current' && 'border-2 border-blue-700',
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={twMerge(
                      stepIdx !== 0 ? 'lg:pl-9' : '',
                      'px-6 py-5 flex items-start text-sm font-medium',
                    )}
                  >
                    <span className="flex-shrink-0">
                      <span
                        className={twMerge(
                          'flex items-center justify-center w-10 h-10  rounded-full',
                          step.status === 'completed' && 'bg-blue-700',
                          step.status === 'current' &&
                            'border-2 border-blue-700',
                          step.status === 'upcoming' &&
                            'border-2 border-gray-300',
                        )}
                      >
                        {step.status === 'completed' && (
                          <CheckIcon
                            className="w-6 h-6 text-white"
                            aria-hidden="true"
                          />
                        )}
                        {step.status !== 'completed' && (
                          <span
                            className={twMerge(
                              'text-blue-700 font-semibold',
                              step.status === 'upcoming' &&
                                'text-gray-400 font-normal',
                            )}
                          >
                            {step.id}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                      <span className="text-xs font-semibold tracking-wide uppercase">
                        {step.name}
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        {step.description}
                      </span>
                    </span>
                  </span>
                </span>

                {stepIdx < list.length && stepIdx > 0 && (
                  <>
                    {/* Separator */}
                    <div
                      className="absolute inset-0 top-0 left-0 hidden w-3 lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-full h-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0.5 0V31L10.5 41L0.5 51V82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default BoxSteps
