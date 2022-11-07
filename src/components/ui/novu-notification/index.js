import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
  IMessage,
} from '@novu/notification-center'

const NovuNotification = () => {
  const onNotificationClick = (notification) => {
    navigate(notification.cta.data.url)
  }
  return (
    <NovuProvider
      subscriberId={'uniqueID'}
      applicationIdentifier={'KLjPvkLDlvhe'}
    >
      <PopoverNotificationCenter>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
export default NovuNotification
