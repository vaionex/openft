import userSelector from '@/redux/selectors/user'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingBars from '../loading-bars'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isUserPending, mnemonicPopup } =
    useSelector(userSelector)

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

    if (authRoute && isAuthenticated && !isUserPending && !mnemonicPopup) {
      router.push('/')
    }
  }, [isUserPending, router, isAuthenticated, mnemonicPopup])

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
