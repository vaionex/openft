import React, { useEffect, useState } from 'react'
import apiConfig from '@/config/relysiaApi'
import { debounce } from 'lodash'
import { useCallback } from 'react'

const usePriceConverter = () => {
  const [usdBalance, setUsdBalance] = useState(null)

  const getUsdBalance = async () => {
    try {
      const {
        data: { data },
      } = await apiConfig.get('/v1/currencyConversion', {
        headers: {
          satoshis: '1',
          currency: 'USD',
        },
      })

      setUsdBalance(parseFloat(data.balance) * 100000000)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!usdBalance) {
      getUsdBalance()
    }
  }, [])

  return usdBalance
}

export default usePriceConverter
