import UserSettingsLayout from '@/components/layout/user-settings-layout'
import ActivityList from '@/components/ui/lists/activity-list'
import { SecurityForm } from '@/components/ui/forms'
import React from 'react'

const activityItems = [
  {
    id: 1,
    name: '2018 Macbook Pro 15-inch',
    location: 'Japan',
    time: '22 Jan at 10:40am',
    active: true,
  },
  {
    id: 2,
    name: '2018 Macbook Pro 15-inch',
    location: 'Japan',
    time: '22 Jan at 9:40am',
    active: false,
  },
  {
    id: 2,
    name: '2017 Macbook Pro 15-inch',
    location: 'Japan',
    time: '22 Jan at 15:40am',
    active: true,
  },
  // More items...
]

const UserSettingsSecuritySection = () => {
  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid md:grid-cols-9 md:gap-24 ">
          <div className="mt-5 md:mt-0 md:col-span-5">
            <div className="sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Password
                <span className="block text-sm font-normal text-gray-500">
                  Please enter your current password to change your password.
                </span>
              </span>
            </div>

            <SecurityForm />
          </div>
          <div className="md:col-span-4">
            <div className="sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Where you’re logged in
                <span className="block text-sm font-normal text-gray-500">
                  We’ll alert you via olivia@gmail.com if there is any unusual
                  activity on your account.
                </span>
              </span>
            </div>
            <ActivityList items={activityItems} />
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsSecuritySection
