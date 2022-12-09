import NextLink from 'next/link'
import { Popover } from '@headlessui/react'
import { CogIcon, MenuIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import MobileNav from '../mobile/nav'
import ActiveLink from '@/components/common/active-link'
import { Logo } from '@/components/common/svgs'
import DropdownUser from '@/components/ui/dropdown-user'
import { UploadBoxIcon, BellIcon, SvgMintIcon } from '@/components/common/icons'
import { connect, useSelector, useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import userSelector from '@/redux/selectors/user'
import { useRouter } from 'next/router'
import NovuNotificationCenter from '@/components/ui/novu-notification-center'
import DropdownMinimal from '@/components/ui/dropdown-minimal'
import DropdownMint from '@/components/ui/dropdown-mint'
import { useLayoutEffect, useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'Contact', href: '/contact' },
]

const mintDrop = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'Contact', href: '/contact' },
]

const Header = () => {
  const { currentUser, isAuthenticated } = useSelector(userSelector)
  const dispatch = useDispatch()

  const router = useRouter()

  const [size, setSize] = useState(0)
  useLayoutEffect(() => {
    function updateSize(size) {
      setSize(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

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
                <a className="outline-none">
                  <span className="sr-only">Workflow</span>
                  <Logo />
                </a>
              </NextLink>
              <div className="flex items-center -mr-2 md:hidden">
                {isAuthenticated && (
                  <div className="inline-flex items-center justify-center p-3">
                    {size < 768 && <NovuNotificationCenter />}
                  </div>
                )}
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
                  <a className="font-medium text-[#667085] hover:text-gray-600">
                    {item.name}
                  </a>
                </ActiveLink>
              ))}
            </div>
          </div>
          <ul className="items-center hidden md:flex md:gap-4">
            <li className={twMerge('hidden', !isAuthenticated && 'list-item')}>
              <NextLink href="/login">
                <a className="text-base font-medium hover:text-gray-500 py-[14px] px-[17px] text-[#667085] hover:bg-gray-50 rounded-lg">
                  Log in
                </a>
              </NextLink>
            </li>
            <li className={twMerge('hidden', !isAuthenticated && 'list-item')}>
              <NextLink href="/register">
                <a className="py-[14px] px-[17px] text-[white] font-medium rounded-lg text-base bg-[#155EEF] hover:bg-[#2d6ff1]">
                  Sign up
                </a>
              </NextLink>
            </li>
            <li className={twMerge('hidden', isAuthenticated && 'list-item')}>
              <DropdownMint />
            </li>
            {isAuthenticated && (
              <li className="list-item md:inline-flex">
                {size > 767 && <NovuNotificationCenter />}
              </li>
            )}

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
