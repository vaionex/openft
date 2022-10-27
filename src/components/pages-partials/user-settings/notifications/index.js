import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { NotificationsForm } from '@/components/ui/forms'
import React, { useEffect, useState } from 'react'
import NotificationList from '@/components/ui/lists/notification-list'
import DropdownMinimal from '@/components/ui/dropdown-minimal'
import { firebaseGetMsgNotification } from '@/firebase/utils'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'

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

const dropdownItems = [
  { id: 1, name: 'Item 1', href: '#' },
  { id: 2, name: 'Item 2', href: '#' },
  { id: 3, name: 'Item 3', href: '#' },
]

const UserSettingsNotificationSection = () => {
  const { currentUser } = useSelector(userSelector)
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    const getNotifications = async () => {
      const notification = await firebaseGetMsgNotification(currentUser.uid)
      setNotifications(notification)
    }
    getNotifications()
  }, [currentUser.uid])

  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid md:grid-cols-9 md:gap-24">
          <div className="mt-5 mb-16 md:mb-0 md:mt-0 md:col-span-5">
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
            <div className="relative sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Recent notification
                <span className="block text-sm font-normal text-gray-500">
                  Latest notification from marketplace.
                </span>
              </span>
              <span className="absolute top-0 right-0">
                <DropdownMinimal items={dropdownItems} />
              </span>
            </div>
            <NotificationList items={notifications} />
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsNotificationSection
