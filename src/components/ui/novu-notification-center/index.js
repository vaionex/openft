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
  const theme = {
    light: {
      loaderColor: '#2563EB',
    },
  }
  return (
    <NovuProvider
      subscriberId={currentUser?.uid}
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID}
    >
      {/* <NotificationBell unseenCount={[]} /> */}
      <PopoverNotificationCenter colorScheme={'light'} theme={theme}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
export default NovuNotificationCenter
