import userSelector from '@/redux/selectors/user'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingBars from '../loading-bars'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isUserPending } = useSelector(userSelector)
    
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

    if (authRoute && isAuthenticated && !isUserPending) {
      router.push('/')
    }
  }, [isUserPending, router])

  if (
    isUserPending ||
    (!isAuthenticated && routesWithAuth) ||
    (isAuthenticated && authRoute)
  ) {
    return <LoadingBars />
  }

  return <>{children}</>
}

export default ProtectedRoute
