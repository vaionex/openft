const { Novu } = require('@novu/node')
const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, userEmail, userName } = req.body

    await novu.subscribers
      .identify(userId, {
        email: userEmail,
        firstName: userName,
      })
      .catch((err) => console.error(err))
    res.status(200).json({ status: 'Success' })
  } else {
    // Handle any other HTTP method
    res.status(405).json({ name: 'else' })
  }
}
