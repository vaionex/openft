import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { FilterIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import NFTMarketplaceFilters from '../filters'

const NFTMarketplaceMobileFilters = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Disclosure>
      <Disclosure.Button className="flex items-center justify-center w-full py-2 font-medium text-blue-500 rounded-md bg-gray-50">
        <FilterIcon className="w-5 h-5 mr-2 " />
        Filters
      </Disclosure.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel className="p-6 bg-gray-50 rounded-b-md">
          <NFTMarketplaceFilters />
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  )
}

export default NFTMarketplaceMobileFilters
