import UserSettingsLayout from '@/components/layout/user-settings-layout'
import ProfileHeaderCard from '@/components/ui/cards/profile-header-card'
import { AvatarUpload } from '@/components/ui/forms'
import { SettingsFormInput } from '@/components/ui/inputs'

const profile = {
  name: 'Olivia John',
  title: 'UI Artist',
  email: 'olivia.john@example.com',
  avatar:
    'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  backgroundImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
}

const UserSettingsMain = () => {
  return (
    <UserSettingsLayout>
      <ProfileHeaderCard profile={profile} />
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
          <SettingsFormInput
            label="Username"
            id="username"
            variant="add-on"
            addon="https://open.ft/"
          />
          <SettingsFormInput
            label="Instagram"
            id="user-instagram"
            variant="add-on"
            addon="https://instagram.com/"
          />

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Your Photo
              <span className="block font-normal text-gray-500">
                This will be displayed on your profile.
              </span>
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="flex items-center">
                <AvatarUpload size={64} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </UserSettingsLayout>
  )
}

export default UserSettingsMain
