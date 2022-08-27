import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { ProfileHeaderCard } from '@/components/ui/cards'
import { MyProfileForm } from '@/components/ui/forms'
import authSelector from '@/redux/selectors/auth'
import { useSelector } from 'react-redux'

const UserSettingsMain = () => {
  const { user } = useSelector(authSelector)
  return (
    <UserSettingsLayout>
      <ProfileHeaderCard user={user} />
      <MyProfileForm user={user} />
    </UserSettingsLayout>
  )
}

export default UserSettingsMain
