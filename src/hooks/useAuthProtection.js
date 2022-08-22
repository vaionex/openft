import authSelector from '@/redux/selectors/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useAuthProtection = () => {
  const router = useRouter()
  const { user } = useSelector(authSelector)

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user, router])

  return user
}

export default useAuthProtection
