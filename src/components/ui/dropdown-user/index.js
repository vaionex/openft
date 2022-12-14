import React, { Fragment } from 'react'
import { logout } from '@/redux/slices/user'
import { clearWalletData } from '@/redux/slices/wallet'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarWithName } from '../avatars'
import { useRouter } from 'next/router'
import {
  UploadBoxIcon,
  WalletOutlineIcon,
  SecurityIcon,
  ProfileOutlineIcon,
  BellIcon,
  LifeBuoyIcon,
  LogOutIcon,
} from '@/components/common/icons'
import NextLink from 'next/link'

const dropdownRoutes = [
  {
    url: '/user-settings',
    name: 'Profile',
    icon: ProfileOutlineIcon,
    desc: 'Change your profile details.',
  },
  {
    url: '/user-settings/mint',
    name: 'Upload',
    icon: UploadBoxIcon,
    desc: 'Upload your artwork and its details here.',
  },
  {
    url: '/user-settings/security',
    name: 'Security',
    icon: SecurityIcon,
    desc: 'Your password and mnemonic phrase.',
  },
  // {
  //   url: '/user-settings/notifications',
  //   name: 'Notifications',
  //   icon: BellIcon,
  //   desc: "Manage when you'll receive notifications.",
  // },
  {
    url: '/user-settings/wallet',
    name: 'Wallet',
    icon: WalletOutlineIcon,
    desc: 'A place where you can check your balance.',
  },
  {
    url: '/contact',
    name: 'Help and support',
    icon: LifeBuoyIcon,
    desc: 'Fix a problem, and get answers to your questions.',
  },
]

const DropdownUser = ({ user }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearWalletData())
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full p-0.5 text-sm font-medium text-gray-700 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          {user ? (
            user.profileImage ? (
              <Avatar
                className="w-10 h-10 bg-blue-700 sm:w-10 sm:h-10"
                user={user}
              />
            ) : (
              <AvatarWithName
                className="w-10 h-10 text-xs sm:w-10 sm:h-10"
                name={user.name}
              />
            )
          ) : (
            <AvatarWithName className="w-10 h-10 sm:w-10 sm:h-10 " />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 px-1">
            {dropdownRoutes.map((route) => {
              return (
                <Menu.Item key={route.url}>
                  {({ active }) => (
                    <NextLink href={route.url}>
                      <a
                        className={twMerge(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'px-4 py-2 text-sm hover:bg-gray-100 rounded-md flex ',
                        )}
                      >
                        <div className="shrink-0">
                          <route.icon
                            className="w-6 h-6 mr-2 stroke-blue-600"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="flex flex-col">
                          <span className="font-semibold">{route.name}</span>
                          <p className="mt-1 text-xs">{route.desc}</p>
                        </div>
                      </a>
                    </NextLink>
                  )}
                </Menu.Item>
              )
            })}
            <form className="py-3">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout()
                      router.push('/')
                    }}
                    className={twMerge(
                      active ? 'bg-gray-100 text-blue-800' : 'text-blue-600 ',
                      'flex justify-center items-center space-x-4 w-full px-4 py-5 font-semibold',
                    )}
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
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownUser
