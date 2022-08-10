import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Logo } from '@/components/common/svgs'
import NextLink from 'next/link'
import ActiveLink from '@/components/common/active-link'

const MobileNav = ({ navItems }) => {
  return (
    <Transition
      as={Fragment}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute z-20 inset-x-0 top-0 p-2 transition origin-top transform md:hidden"
      >
        <div className="overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="flex items-center justify-between px-5 pt-4">
            <div>
              <Logo />
            </div>
            <div className="-mr-2">
              <Popover.Button className="p-2 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-blue-50">
                <span className="sr-only">Close menu</span>
                <XIcon className="w-6 h-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div className="pt-5 pb-6">
            <div className="px-2 space-y-1">
              {navItems.map((item) => (
                <ActiveLink
                  key={item.name}
                  href={item.href}
                  activeClassName=" text-blue-600 font-semibold"
                >
                  <a className="block px-3 py-2 text-base font-medium rounded-md text-primary hover:bg-gray-900">
                    {item.name}
                  </a>
                </ActiveLink>
              ))}
            </div>

            <div className="px-5 mt-6">
              <p className="text-base font-medium text-center text-gray-500">
                Do you have an account?{' '}
                <NextLink href="/login">
                  <a className="text-blue-700 hover:underline">Login</a>
                </NextLink>
              </p>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  )
}

export default MobileNav
