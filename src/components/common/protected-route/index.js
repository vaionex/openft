import userSelector from '@/redux/selectors/user'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isUserPending } = useSelector(userSelector)

  const router = useRouter()

  const authRoute =
    router.pathname === '/register' || router.pathname === '/login'

  const routesWithAuth = router.pathname.includes('user-settings')

  useEffect(() => {
    console.log(isUserPending, 'isUserPending')
    console.log(isAuthenticated, 'isAuthenticated')

    if (routesWithAuth && !isAuthenticated && !isUserPending) {
      routesWithAuth && !isAuthenticated && router.push('/login')
    }

    if (authRoute && isAuthenticated && !isUserPending) {
      router.push('/')
    }
  }, [isUserPending])

  if (
    isUserPending ||
    (!isAuthenticated && routesWithAuth) ||
    (isAuthenticated && authRoute)
  ) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
