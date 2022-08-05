import UserSettingsLayout from '@/components/layout/user-settings-layout'
import ProfileHeaderCard from '@/components/ui/cards/profile-header-card'
import Checkbox from '@/components/ui/checkbox'
import { AvatarUpload } from '@/components/ui/forms'
import { SettingsFormInput } from '@/components/ui/inputs'

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
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
          <SettingsFormInput
            label="Username"
            id="username"
            variant="add-on"
            addon="open.ft/"
            placeholder="Username"
          />
          <SettingsFormInput
            label="Instagram"
            id="user-instagram"
            variant="add-on"
            addon="https://instagram.com/"
            placeholder="Instagram username"
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
                <AvatarUpload size={64} tempAvatar={profile.avatar} />
              </div>
            </div>
          </div>

          <SettingsFormInput
            label="Job title"
            id="job-title"
            placeholder="e.g. UI Artist"
            additionalCheckbox={
              <Checkbox
                id="show-job-title"
                text="Show my job title in my profile"
                className="mt-4"
              />
            }
          />
        </div>
      </form>
    </UserSettingsLayout>
  )
}

export default UserSettingsMain
