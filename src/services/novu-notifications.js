import { Novu } from '@novu/node'
import fetch from 'node-fetch'

export const CreateNovuNotification = async (userId, message) => {
  const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY)

  await novu
    .trigger('in-app', {
      to: {
        subscriberId: userId,
      },
      payload: {
        notificationContent: message,
      },
    })
    .then((res) => res)
    .catch((err) => {
      console.log(err)
    })
}

export const CreateNovuSubscriber = async (
  userId,
  userEmail,
  userFirstName,
) => {
  const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY)

  await novu.subscribers
    .identify(userId, {
      email: userEmail,
      firstName: userFirstName,
    })
    .then((res) => res)
    .catch((err) => {
      console.log(err)
    })
}
