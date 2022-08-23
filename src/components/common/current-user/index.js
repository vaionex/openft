import React, { useEffect } from 'react'
import { getwalletDetails } from '@/services/relysia-queries'
import { onIdTokenChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { firebaseAuth } from '@/firebase/init'
import { useRouter } from 'next/router'
import apiConfig from '@/config/relysiaApi'
import useAuthProtection from '@/hooks/useAuthProtection'

function GetCurrentUser() {
  const router = useRouter()
  const dispatch = useDispatch()
  const authStatus = useAuthProtection()

  useEffect(() => {
    try {
      onIdTokenChanged(firebaseAuth, (user) => {
        if (user) {
          console.log('get token id, iiiiiii')
          apiConfig.defaults.headers.common['authToken'] = user.accessToken
          getwalletDetails('00000000-0000-0000-0000-000000000000', dispatch)
        }
      })
    } catch (err) {
      console.log('err ', err.message, err.response)
    }
  }, [router])

  return <></>
}

export default GetCurrentUser
