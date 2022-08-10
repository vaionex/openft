import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { NotificationsForm, SecurityForm } from '@/components/ui/forms'
import React from 'react'
import NotificationList from '@/components/ui/lists/notification-list'

const items = [
  {
    id: 1,
    text: 'Paulo just purchased your artwork.',
    time: '22 Jan at 10:40am',
    isNew: true,
  },
  {
    id: 2,
    text: 'You just purchased an artwork.',
    time: '22 Jan at 10:40am',
    isNew: true,
  },
  {
    id: 3,
    text: 'There has been a price change for Cutecat artwork. Click to see more.',
    time: '22 Jan at 10:40am',
    isNew: false,
  },
]

const UserSettingsNotificationSection = () => {
  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid md:grid-cols-9 md:gap-24">
          <div className="mt-5 md:mt-0 md:col-span-5">
            <div className="sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Notifications
                <span className="block text-sm font-normal text-gray-500">
                  Manage when you’ll receive notifications.
                </span>
              </span>
            </div>

            <NotificationsForm />
          </div>
          <div className="md:col-span-4">
            <div className="sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Recent notification
                <span className="block text-sm font-normal text-gray-500">
                  Latest notification from marketplace.
                </span>
              </span>
            </div>
            <NotificationList items={items} />
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsNotificationSection
