import { useState } from 'react'
import apiConfig from '@/config/relysiaApi'

export default function useRedeemToken() {
  const [loading, setLoading] = useState(false)

  async function redeemToken(tokenID, serialNumber, amount) {
    setLoading(true)
    let error
    try {
      await apiConfig.post('/v1/redeem', {
        dataArray: [
          {
            amount,
            tokenId: tokenID,
            sn: serialNumber,
          },
        ],
      })
    } catch (e) {
      error = e
    }

    setLoading(false)
    return { error }
  }

  return { redeemToken, loading }
}
