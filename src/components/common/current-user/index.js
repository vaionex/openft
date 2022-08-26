import React, { useEffect } from 'react'
import { createwallet, getWalletAddressAndPaymail, getwalletDetails } from '@/services/relysia-queries'
import { onIdTokenChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseAuth } from '@/firebase/init'
import { useRouter } from 'next/router'
import apiConfig from '@/config/relysiaApi'
import useAuthProtection from '@/hooks/useAuthProtection'
import walletSelector from '@/redux/selectors/wallet'

function GetCurrentUser() {
  const router = useRouter()
  const dispatch = useDispatch()
  const authStatus = useAuthProtection()
  const { paymail, address } = useSelector(walletSelector)
  const walletId = '00000000-0000-0000-0000-000000000000'

  useEffect(() => {
    try {
      onIdTokenChanged(firebaseAuth, async (user) => {
        if (user) {
          apiConfig.defaults.headers.common['authToken'] = user.accessToken
          if (!paymail && !address) {
            const walletData = await getWalletAddressAndPaymail(walletId)
            if (walletData.address && walletData.paymail) {
              getwalletDetails(walletId, dispatch)
            } else {
              createwallet('default', dispatch)
            }
          }
        }
      })
    } catch (err) {
      console.log('err ', err.message, err.response)
    }
  }, [router])

  return <></>
}

export default GetCurrentUser
