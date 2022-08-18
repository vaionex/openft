import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useAuthProtection = () => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const routesWithAuth =
    router.pathname === '/user-settings'
    || router.pathname === '/user-settings/upload'
    || router.pathname === '/user-settings/security'
    || router.pathname === '/user-settings/notifications'
    || router.pathname === '/user-settings/wallet'


  useEffect(() => {
    if (routesWithAuth) {
      if (!auth.user) {
        router.replace('/')
      }
    }
  }, [auth.user, router])

  return auth.user
}

export default useAuthProtection
