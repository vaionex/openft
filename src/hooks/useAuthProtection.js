import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { protectedRoute } from '@/utils/protectedRoute'
import authSelector from '@/redux/selectors/auth'

const useAuthProtection = () => {
  const router = useRouter()
  const { user } = useSelector(authSelector)

  useEffect(() => {
    protectedRoute(user, router)
  }, [user, router])

  return user
}

export default useAuthProtection
