import userSelector from '@/redux/selectors/user'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingBars from '../loading-bars'

const ProtectedRoute = ({ children }) => {
  const { currentUser, isAuthenticated, isUserPending, mnemonicPopup } =
    useSelector(userSelector)

  const isGoogleUser = currentUser?.isGoogleUser || currentUser?.isSocialUser
  const router = useRouter()

  const authRoute =
    router.pathname === '/register' ||
    router.pathname === '/login' ||
    router.pathname === '/reset-password'

  const routesWithAuth = router.pathname.includes('user-settings')

  useEffect(() => {
    if (routesWithAuth && !isAuthenticated && !isUserPending) {
      router.push('/login')
    }

    if (isGoogleUser && !mnemonicPopup && !currentUser?.username) {
      router.push("/register")
    }

    if (authRoute && isAuthenticated && !isUserPending && !mnemonicPopup && (isGoogleUser ? currentUser?.username : true)) {
      router.push('/')
    }
  }, [isUserPending, router.pathname, isAuthenticated, mnemonicPopup])

  if (isGoogleUser && !currentUser?.username && router.pathname === '/register') return <>{children}</>

  if (
    isUserPending ||
    (!isAuthenticated && routesWithAuth) ||
    (isAuthenticated && authRoute && !mnemonicPopup)
  ) {
    return <LoadingBars />
  }

  return <>{children}</>
}

export default ProtectedRoute
