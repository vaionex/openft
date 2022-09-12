import React, { useEffect, useState } from 'react'
import apiConfig from '@/config/relysiaApi'

const usePriceConverter = () => {
  const [usdBalance, setUsdBalance] = useState(null)

  useEffect(() => {
    if (!usdBalance) {
      ;(async () => {
        await apiConfig
          .get('/v1/currencyConversion', {
            headers: {
              satoshis: '1',
              currency: 'USD',
            },
          })
          .then((res) =>
            setUsdBalance(parseFloat(res.data.data.balance) * 100000000),
          )
      })()
    }
  }, [])
  return { usdBalance }
}

export default usePriceConverter
