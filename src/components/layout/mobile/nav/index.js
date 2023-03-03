import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Logo } from '@/components/common/svgs'
import NextLink from 'next/link'
import Image from 'next/image'
import ActiveLink from '@/components/common/active-link'
import DropdownUser from '@/components/ui/dropdown-user'
import { LogOutIcon } from '@/components/common/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { logout } from '@/redux/slices/user'
import { clearWalletData } from '@/redux/slices/wallet'
import userSelector from '@/redux/selectors/user'
import { twMerge } from 'tailwind-merge'
import { disconnectRelysiaSocket } from '@/services/relysia-socket'

const ProfileRoutes = [
  {
    href: '/user-settings',
    name: 'Profile',
  },
  {
    href: '/user-settings/mint',
    name: 'Upload',
  },
  {
    href: '/user-settings/collection',
    name: 'Collection',
  },
  {
    href: '/user-settings/security',
    name: 'Security',
  },
  {
    href: '/user-settings/mfa',
    name: '2-Factor Authentication',
  },
  {
    href: '/user-settings/wallet',
    name: 'Wallet',
  },
  {
    href: '/contact',
    name: 'Help and support',
  },
]

const MobileNav = ({ navItems }) => {
  const { isAuthenticated } = useSelector(userSelector)

  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    disconnectRelysiaSocket()

    dispatch(logout())
    dispatch(clearWalletData())
  }

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
        className="absolute inset-x-0 top-0 z-20 p-2 transition origin-top transform md:hidden"
      >
        <div className="overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="flex items-center justify-between px-5 pt-4">
            <NextLink href="/" className="inline-block outline-none">
              <div className="flex items-center cursor-pointer">
                <span className="sr-only">Nftana Logo</span>
                <div className="w-5 h-5">
                  <Image
                    className="h-5 pb-0.5 flex-none"
                    src="https://www.relysia.com/_next/static/media/RelysiaLogo_1.4aba7d51.svg"
                    alt="Relysia"
                    height='20px'
                    width='17px'
                  />
                </div>
                <p className="pl-2 text-xl font-semibold text-blue-900">
                  Nftana
                </p>
              </div>
            </NextLink>
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
                  <a className="block px-3 py-2 text-base font-medium rounded-md text-primary hover:text-white hover:bg-gray-900">
                    {item.name}
                  </a>
                </ActiveLink>
              ))}
            </div>
            {isAuthenticated ? (
              <div className="pt-3 pb-6">
                <div className="px-3 space-y-1">
                  <p className="px-2 text-lg font-bold text-black">
                    User settings
                  </p>
                  {ProfileRoutes.map((item) => (
                    <ActiveLink
                      key={item.name}
                      href={item.href}
                      activeClassName=" text-blue-600 font-semibold"
                    >
                      <a className="block px-3 py-2 text-base font-medium rounded-md text-primary hover:text-white hover:bg-gray-900">
                        {item.name}
                      </a>
                    </ActiveLink>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      handleLogout()
                      router.push('/')
                    }}
                    className={
                      'flex justify-center items-center space-x-4 w-full px-4 py-5 font-semibold'
                    }
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">Log out</span>
                    </div>

                    <div className="shrink-0">
                      <LogOutIcon
                        className="w-6 h-6 mr-2 stroke-blue-600"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}

            {!isAuthenticated ? (
              <div className="px-5 mt-6">
                <p className="text-base font-medium text-center text-gray-500">
                  Do you have an account?{' '}
                  <NextLink href="/login">
                    <a className="text-blue-700 hover:underline">Login</a>
                  </NextLink>
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  )
}
export default MobileNav
