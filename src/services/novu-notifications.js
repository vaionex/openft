import fetch from 'node-fetch'

export async function SendNotification(userId, message) {
  try {
    const sendNotification = await fetch('/api/novu', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        message,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const data = await sendNotification.json()
  } catch (err) {
    console.error('2::', err)
  }
}

export async function CreateNovuSubscriber(userId, userEmail, userName) {
  try {
    const CreateNovuSubscriber = await fetch('/api/createNovuSub', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        userEmail,
        userName,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const data = await CreateNovuSubscriber.json()
  } catch (err) {
    console.error('error::', err)
  }
}
