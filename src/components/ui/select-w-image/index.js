import React, { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, XCircleIcon } from '@heroicons/react/outline'
import { twMerge } from 'tailwind-merge'
import PropTypes from 'prop-types'
import { Avatar, AvatarWithName } from '../avatars'

const SelectWImage = ({
  users,
  placeholder,
  label,
  selectedUser,
  setSelectedUser,
  clearSelectedUser,
}) => {
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredUsers =
    query === ''
      ? users
      : users.filter((user) => {
          return user.name.toLowerCase().includes(query.toLowerCase())
        })

  if (!mounted) return null

  return (
    <Combobox as="div" value={selectedUser} onChange={setSelectedUser}>
      <Combobox.Label className="block text-sm text-gray-700">
        {label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full py-2 pl-3 pr-10 bg-white border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(user) => user?.name}
          placeholder={placeholder}
        />
        {selectedUser ? (
          <div
            onClick={clearSelectedUser}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 cursor-pointer rounded-r-md focus:outline-none"
          >
            <XCircleIcon className="w-5 h-5 text-gray-400" />
          </div>
        ) : (
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 rounded-r-md focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </Combobox.Button>
        )}

        {filteredUsers.length > 0 && (
          <Combobox.Options className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredUsers.map((user) => (
              <Combobox.Option
                key={user.uid}
                value={user}
                className={({ active }) =>
                  twMerge(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-blue-500 text-white' : 'text-gray-900',
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center cursor-pointer">
                      <div className="min-w-[40px]">
                        {user.profileImage ? (
                          <Avatar
                            user={user}
                            className="w-10 h-10 sm:w-10 sm:h-10"
                          />
                        ) : (
                          <AvatarWithName
                            name={user.name}
                            className="w-10 h-10 sm:w-10 sm:h-10"
                          />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={twMerge(
                            'ml-3 truncate text-sm',
                            selected && 'font-semibold',
                          )}
                        >
                          {user.name}
                        </span>
                        <span
                          className={twMerge(
                            'ml-3 truncate text-sm',
                            active ? 'text-gray-200' : 'text-gray-500',
                          )}
                        >
                          @{user.username}
                        </span>
                      </div>
                    </div>

                    {selectedUser && selectedUser.uid === user.uid && (
                      <span
                        className={twMerge(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-blue-500',
                        )}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}

SelectWImage.defaultProps = {
  users: [],
  placeholder: 'Select a person',
  label: 'Select a person',
}

SelectWImage.propTypes = {
  users: PropTypes.array,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  selectedUser: PropTypes.object,
  setSelectedUser: PropTypes.func,
  clearSelectedUser: PropTypes.func,
}

export default React.memo(SelectWImage)
