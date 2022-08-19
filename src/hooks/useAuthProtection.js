import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { protectedRoute } from '@/utils/protectedRoute'

const useAuthProtection = () => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    protectedRoute(auth.user, router)
  }, [auth.user, router])

  return auth.user
}

export default useAuthProtection
