import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
  IMessage,
} from '@novu/notification-center'

const NovuNotificationSection = () => {
  const onNotificationClick = (notification) => {
    navigate(notification.cta.data.url)
  }
  return (
    <NovuProvider
      subscriberId={'uniqueID'}
      applicationIdentifier={'KLjPvkLDlvhe'}
    >
      <PopoverNotificationCenter onNotificationClick={onNotificationClick}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
export default NovuNotificationSection
