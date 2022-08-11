import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { ProfileHeaderCard } from '@/components/ui/cards'
import { MyProfileForm } from '@/components/ui/forms'

const profile = {
  name: 'Olivia John',
  title: 'UI Artist',
  email: 'olivia.john@example.com',
  avatar: '/images/test/test-user-image.webp',
  backgroundImage: '/images/test/test-user-bg-image.webp',
}

const UserSettingsMain = () => {
  return (
    <UserSettingsLayout>
      <ProfileHeaderCard profile={profile} />
      <MyProfileForm profile={profile} />
    </UserSettingsLayout>
  )
}

export default UserSettingsMain
