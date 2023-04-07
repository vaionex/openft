import crypto from 'crypto'

function sortedMessage(parameters) {
  const sortedKeys = Object.keys(parameters).sort()
  const sortedParams = sortedKeys
    .map((key) => `${key}=${parameters[key]}`)
    .join('|')
  return sortedParams
}

export default async function topup(req, res) {
  const { PAYMAIL, EMAIL } = req.query
  const CLIENT_ID = 'vaionex_corp'
  const SECRET_API = process.env.CENTI_SECRET;

  if (!PAYMAIL || !EMAIL) {
    return res.status(400).json({ error: 'Missing PAYMAIL or EMAIL parameter' })
  }

  const params = {
    client_id: CLIENT_ID,
    paymail_address: PAYMAIL,
    email: EMAIL,
  }

  const message = sortedMessage(params)

  const hmac = crypto.createHmac('sha512', SECRET_API)
  hmac.update(message)
  const hmac_raw = hmac.digest()
  const hmac_base64 = Buffer.from(hmac_raw)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

  const url = `https://staging-topup.centi.ch/#/?client_id=${CLIENT_ID}&paymail_address=${encodeURIComponent(
    PAYMAIL,
  )}&email=${encodeURIComponent(EMAIL)}&hmac=${hmac_base64}`

  return res.status(200).json({ url })
}
