import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Logo } from '@/components/common/svgs'
import NextLink from 'next/link'

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
        className="absolute inset-x-0 top-0 p-2 transition origin-top transform md:hidden"
      >
        <div className="overflow-hidden rounded-lg shadow-md bg-body ring-1 ring-black ring-opacity-5">
          <div className="flex items-center justify-between px-5 pt-4">
            <div>
              <Logo />
            </div>
            <div className="-mr-2">
              <Popover.Button className="px-2 btn-dark">
                <span className="sr-only">Close menu</span>
                <XIcon className="w-6 h-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div className="pt-5 pb-6">
            <div className="px-2 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium rounded-md text-primary hover:bg-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="px-5 mt-6">
              <NextLink href="#">
                <a className="w-full btn-dark">Start free trial</a>
              </NextLink>
            </div>
            <div className="px-5 mt-6">
              <p className="text-base font-medium text-center text-gray-500">
                Existing customer?{' '}
                <NextLink href="#">
                  <a className="text-primary hover:underline">Login</a>
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
