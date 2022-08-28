import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { ProfileHeaderCard } from '@/components/ui/cards'
import { MyProfileForm } from '@/components/ui/forms'
import userSelector from '@/redux/selectors/user'
import { useSelector } from 'react-redux'

const UserSettingsMain = () => {
  const { currentUser } = useSelector(userSelector)
  return (
    <UserSettingsLayout>
      <ProfileHeaderCard user={currentUser} />
      <MyProfileForm user={currentUser} />
    </UserSettingsLayout>
  )
}

export default UserSettingsMain
