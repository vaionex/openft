import { useState } from 'react'
import apiConfig from '@/config/relysiaApi'

export default function useRedeemToken() {
  const [loading, setLoading] = useState(false)

  async function redeemToken(tokenID, serialNumber, amount) {
    setLoading(true)
    let message
    let error
    try {
      let response = await apiConfig.post('/v1/redeem', {
        dataArray: [
          {
            amount,
            tokenId: tokenID,
            sn: serialNumber,
          },
        ],
      })
      message = response?.data?.data?.msg || 'Operation completed successfully'
    } catch (e) {
      error = e
    }

    setLoading(false)
    return { error, message }
  }

  return { redeemToken, loading }
}
