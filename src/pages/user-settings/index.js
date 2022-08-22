import UserSettingsMain from '@/components/pages-partials/user-settings'
import authSelector from '@/redux/selectors/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const UserSettings = () => {
  const { user } = useSelector(authSelector)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])

  if (!user) {
    return null
  }

  return <UserSettingsMain />
}

export default UserSettings
