import NextLink from 'next/link'
import { Popover } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import MobileNav from '../mobile/nav'
import ActiveLink from '@/components/common/active-link'
import { Logo } from '@/components/common/svgs'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '#' },
  { name: 'Contribute', href: '#' },
]

const Header = () => {
  return (
    <Popover as="header" className="relative">
      <div className="bg-transparent">
        <nav
          className="relative flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6"
          aria-label="Global"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <NextLink href="/">
                <a>
                  <span className="sr-only">Workflow</span>
                  <Logo />
                </a>
              </NextLink>
              <div className="flex items-center -mr-2 md:hidden">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-blue-50">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="w-6 h-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden space-x-8 md:flex md:ml-10">
              {navigation.map((item) => (
                <ActiveLink
                  key={item.name}
                  href={item.href}
                  activeClassName=" text-blue-600 font-semibold"
                >
                  <a className="font-medium text-gray-500 hover:text-gray-600">
                    {item.name}
                  </a>
                </ActiveLink>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NextLink href="/login">
              <a className="text-base font-medium hover:text-gradient-primary-hover">
                Login
              </a>
            </NextLink>
            <NextLink href="register">
              <a className="btn-primary">Sign up</a>
            </NextLink>
          </div>
        </nav>
      </div>

      <MobileNav navItems={navigation} />
    </Popover>
  )
}

export default Header
