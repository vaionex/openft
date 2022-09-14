import NextLink from 'next/link'
import { Popover } from '@headlessui/react'
import { BellIcon, CogIcon, MenuIcon } from '@heroicons/react/outline'
import MobileNav from '../mobile/nav'
import ActiveLink from '@/components/common/active-link'
import { Logo } from '@/components/common/svgs'
import DropdownUser from '@/components/ui/dropdown-user'
import { UploadBoxIcon } from '@/components/common/icons'
import { connect, useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import userSelector from '@/redux/selectors/user'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'Contribute', href: '/contribute' },
]

const Header = () => {
  const { currentUser, isAuthenticated } = useSelector(userSelector)
  const router = useRouter()

  return (
    <Popover as="header" className="relative">
      <div className="bg-transparent">
        <nav
          className="relative flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6 min-h-[100px]"
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
                  activeClassName="text-blue-600 font-semibold pointer-events-none"
                >
                  <a className="font-medium text-gray-500 hover:text-gray-600">
                    {item.name}
                  </a>
                </ActiveLink>
              ))}
            </div>
          </div>

          <ul className="items-center hidden md:flex md:gap-4 md:items-center ">
            <li className={twMerge('hidden', !isAuthenticated && 'list-item')}>
              <NextLink href="/login">
                <a className="text-base font-medium hover:text-gradient-primary-hover">
                  Login
                </a>
              </NextLink>
            </li>
            <li className={twMerge('hidden', !isAuthenticated && 'list-item')}>
              <NextLink href="register">
                <a className="btn-primary">Sign up</a>
              </NextLink>
            </li>
            <li className={twMerge('hidden', isAuthenticated && 'list-item')}>
              <button className="btn-secondary">
                <UploadBoxIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                Mint
              </button>
            </li>
            <li className={twMerge('hidden', isAuthenticated && 'list-item')}>
              <ul className="flex items-center gap-1">
                <li className="inline-flex">
                  <NextLink href="/user-settings">
                    <a className="inline-block p-3 text-base font-medium bg-gray-50 hover:text-gradient-primary-hover">
                      <CogIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </NextLink>
                </li>
                <li className="inline-flex">
                  <NextLink href="/user-settings">
                    <a className="inline-block p-3 text-base font-medium hover:text-gradient-primary-hover">
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </NextLink>
                </li>
              </ul>
            </li>

            <li className={twMerge('hidden', isAuthenticated && 'list-item')}>
              <DropdownUser user={currentUser} />
            </li>
          </ul>
        </nav>
      </div>

      <MobileNav navItems={navigation} />
    </Popover>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    currentUser: state.user.currentUser,
  }
}

export default connect(mapStateToProps)(Header)
