import Checkbox from '@/components/ui/checkbox'
import { AvatarUpload } from '@/components/ui/forms'
import { InputMain } from '@/components/ui/inputs'
import TextEditor from '@/components/ui/text-editor'
import PropTypes from 'prop-types'

const MyProfileForm = ({ profile }) => {
  return (
    <form className="mt-12 space-y-8 divide-y divide-gray-200">
      <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
        <InputMain>
          <InputMain.Label label="Username" htmlFor="username" />
          <InputMain.Input
            id="username"
            variant="add-on"
            addon="open.ft/"
            placeholder="Username"
            className="sm:col-span-2"
          />
        </InputMain>

        <InputMain>
          <InputMain.Label label="Instagram" htmlFor="user-instagram" />
          <InputMain.Input
            id="user-instagram"
            variant="add-on"
            addon="https://instagram.com/"
            placeholder="Instagram username"
            className="sm:col-span-2"
          />
        </InputMain>

        <InputMain>
          <InputMain.Label
            label="Your Photo"
            subLabel="This will be displayed on your profile."
          />
          <div className="sm:col-span-2">
            <AvatarUpload size={64} tempAvatar={profile.avatar} />
          </div>
        </InputMain>

        <InputMain>
          <InputMain.Label
            label="Your Bio"
            subLabel="Write a short introduction."
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <TextEditor onChange={() => {}} />
            <p className="mt-2 text-sm text-gray-500">400 characters left</p>
          </div>
        </InputMain>

        <InputMain className="border-none">
          <InputMain.Label label="Job title" htmlFor="job-title" />
          <InputMain.Input
            id="job-title"
            placeholder="e.g. UI Artist"
            className="sm:col-span-2"
            additionalCheckbox={
              <Checkbox
                id="show-job-title"
                text="Show my job title in my profile"
                className="mt-4"
              />
            }
          />
        </InputMain>
      </div>
    </form>
  )
}

MyProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default MyProfileForm
