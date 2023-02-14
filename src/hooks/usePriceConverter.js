import React, { useEffect, useState } from 'react'
import apiConfig from '@/config/relysiaApi'
import { debounce } from 'lodash'
import { useCallback } from 'react'
import walletSelector from '@/redux/selectors/wallet'
import { useSelector, useDispatch } from 'react-redux'
import { updateBsvRate } from '@/redux/slices/wallet'

const usePriceConverter = () => {
  const dispatch = useDispatch()
  const [usdBalance, setUsdBalance] = useState(null)

  const { bsvRate } = useSelector(walletSelector)

  const getUsdBalance = async () => {
    try {
      if (bsvRate) {
        setUsdBalance(bsvRate)
        return
      }

      const {
        data: { data },
      } = await apiConfig.get('/v1/currencyConversion', {
        headers: {
          satoshis: '1',
          currency: 'USD',
        },
      })

      let balance = parseFloat(data.balance) * 100000000
      setUsdBalance(balance)
      dispatch(updateBsvRate(balance))
    } catch (error) {
      console.log('error usd hook', error)
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
