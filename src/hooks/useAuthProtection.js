import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { protectedRoute } from '@/utils/protectedRoute'
import userSelector from '@/redux/selectors/user'

const useAuthProtection = () => {
  const router = useRouter()
  const { currentUser, isAuthenticated } = useSelector(userSelector)

  useEffect(() => {
    protectedRoute(isAuthenticated, router)
  }, [isAuthenticated, router])

  return currentUser
}

export default useAuthProtection
