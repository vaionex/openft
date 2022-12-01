const { Novu } = require('@novu/node')
const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, message } = req.body
    await novu
      .trigger('in-app', {
        to: {
          subscriberId: userId,
        },
        payload: {
          notificationContent: message,
        },
      })
      .catch((err) => console.error(err))
    res.status(200).json({ message, status: 'Success' })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'else' })
  }
}
