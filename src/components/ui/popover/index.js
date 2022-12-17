import { Popover, Transition } from '@headlessui/react'
import { ShareIcon, ClipboardCheckIcon } from '@heroicons/react/outline'
import { Fragment, useState } from 'react'
import {
  ShareIcon as LinkIcon,
  FacebookIcon,
  TwitterIcon,
} from '@/components/common/icons'

export default function Social({ path }) {
  const [status, setStatus] = useState(false)
  const uri = encodeURIComponent(path)

  const copyToClipboard = () => {
    setStatus(true)
    navigator.clipboard.writeText(`https://nftana.com${path}`)
    setTimeout(() => setStatus(false), 2000)
  }
  return (
    <div className="w-10 h-10 overflow-visible max-w-sm flex justify-center items-center">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group items-center h-10 w-10 rounded-md text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <ShareIcon
                className="h-6 w-6 mx-auto text-blue-700"
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-4 bottom-16 z-[9999999] mt-3 w-screen max-w-[43px] transform px-0">
                <div className="overflow-hidden w-full rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative flex flex-col space-y-2 bg-white">
                    <div
                      className="flex w-full justify-center items-center hover:bg-gray-100"
                      data-href={`https://nftana.com${path}`}
                      data-layout="button"
                      data-size="small"
                    >
                      <a
                        target="_blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnftana.com${uri}&amp;src=sdkpreparse`}
                        className="fb-xfbml-parse-ignore mx-auto p-1"
                        rel="noreferrer noopener"
                      >
                        <FacebookIcon
                          className="w-7 h-7 text-blue-600 stroke-[2.6]"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                    <div className="flex  w-full justify-center items-center hover:bg-gray-100">
                      <a
                        className="twitter-share-button p-1"
                        target="_blank"
                        rel="noreferrer noopener"
                        href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fnftana.com${uri}`}
                        data-size="large"
                      >
                        <TwitterIcon
                          className="w-7 h-7 text-blue-600 stroke-[2.6]"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                    <div className="flex w-full justify-center items-center hover:bg-gray-100">
                      <div
                        className="flex w-full p-1 h-full justify-center items-center"
                        onClick={copyToClipboard}
                      >
                        {!status ? (
                          <LinkIcon
                            className="w-6 h-7 text-blue-600 stroke-[2.6]"
                            aria-hidden="true"
                          />
                        ) : (
                          <ClipboardCheckIcon
                            className="w-7 h-7 text-green-600"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}
