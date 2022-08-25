import React, { Fragment } from 'react'
import { logout } from '@/redux/slices/auth'
import { clearWalletData } from '@/redux/slices/wallet'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarWithName } from '../avatars'

const DropdownUser = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearWalletData())
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full p-0.5 text-sm font-medium text-gray-700 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          {user &&
            (user.profileImage ? (
              <Avatar className="w-10 h-10 sm:w-10 sm:h-10" user={user} />
            ) : (
              <AvatarWithName
                className="w-10 h-10 sm:w-10 sm:h-10"
                name={user.name}
              />
            ))}
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
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={twMerge(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>

            <form>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => handleLogout()}
                    className={twMerge(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm',
                    )}
                  >
                    Sign out
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
