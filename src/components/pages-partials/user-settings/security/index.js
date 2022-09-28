import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { SecurityForm } from '@/components/ui/forms'
import React from 'react'

const UserSettingsSecuritySection = () => {
  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid md:grid-cols-9 md:gap-24 ">
          <div className="mt-5 mb-16 md:mb-0 md:mt-0 md:col-span-5">
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
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsSecuritySection
