import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { UploadForm } from '@/components/ui/forms'
import { EyeIcon } from '@heroicons/react/outline'

const UserSettingsUploadSection = () => {
  const showPreview = (e) => {
    e.preventDefault()
  }

  return (
    <UserSettingsLayout>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-b sm:border-gray-200 sm:pb-5">
        <span className="block text-lg font-medium text-gray-700">
          Upload Artwork
          <span className="block text-sm font-normal text-gray-500">
            This will be displayed on your profile.
          </span>
        </span>
      </div>
      <UploadForm />
    </UserSettingsLayout>
  )
}

export default UserSettingsUploadSection
