import userSelector from '@/redux/selectors/user'
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const NovuNotificationCenter = () => {
  const { currentUser, isAuthenticated } = useSelector(userSelector)
  return (
    <NovuProvider
      subscriberId={currentUser?.uid}
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID}
    >
      <PopoverNotificationCenter>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
export default NovuNotificationCenter
