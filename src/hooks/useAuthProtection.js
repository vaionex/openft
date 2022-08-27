import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { protectedRoute } from '@/utils/protectedRoute'
import authSelector from '@/redux/selectors/auth'

const useAuthProtection = () => {
  const router = useRouter()
  const { user, isPending, isAuthenticated } = useSelector(authSelector)

  useEffect(() => {
    protectedRoute(user, isAuthenticated, isPending, router)
  }, [user, router])

  return user
}

export default useAuthProtection
