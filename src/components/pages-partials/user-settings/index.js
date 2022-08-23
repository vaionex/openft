import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { ProfileHeaderCard } from '@/components/ui/cards'
import { MyProfileForm } from '@/components/ui/forms'
import authSelector from '@/redux/selectors/auth'
import { useSelector } from 'react-redux'

const profile = {
  name: 'Olivia John',
  title: 'UI Artist',
  email: 'olivia.john@example.com',
  profileImage: '/images/test/test-user-image.webp',
  coverImage: '/images/test/test-user-bg-image.webp',
}

const UserSettingsMain = () => {
  const { user } = useSelector(authSelector)
  return (
    <UserSettingsLayout>
      <ProfileHeaderCard profile={user} />
      <MyProfileForm profile={user} />
    </UserSettingsLayout>
  )
}

export default UserSettingsMain
