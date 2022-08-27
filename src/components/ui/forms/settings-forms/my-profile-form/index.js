import AvatarUpload from '@/components/ui/avatar-upload'
import Checkbox from '@/components/ui/checkbox'
import { InputMain } from '@/components/ui/inputs'
import TextEditor from '@/components/ui/text-editor'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const MyProfileForm = ({ user }) => {
  const dispatch = useDispatch()
  const usernameRegex = /^[a-z0-9]+$/
  const [formValues, setFormValues] = useState({
    username: '',
    instagram: '',
    bio: '',
    jobTitle: '',
    showJobTitle: false,
  })

  useEffect(() => {
    if (user) {
      setFormValues({
        username: user?.username || '',
        instagram: user?.instagram || '',
        bio: user?.bio || '',
        jobTitle: user?.jobTitle?.title || '',
        showJobTitle: user?.jobTitle?.show || false,
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    if (e.target.name === 'showJobTitle') {
      setFormValues((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.checked,
        }
      })
    } else {
      setFormValues((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        }
      })
    }
  }

  return (
    <form className="mt-12 space-y-8 divide-y divide-gray-200">
      <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
        <InputMain className="sm:grid-cols-3">
          <InputMain.Label label="Username" htmlFor="username" />
          <InputMain.Input
            id="username"
            name="username"
            variant="add-on"
            addon="open.ft/"
            placeholder="username"
            className="sm:col-span-2"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label label="Instagram" htmlFor="user-instagram" />

          <InputMain.Input
            id="instagram"
            name="instagram"
            variant="add-on"
            addon="https://instagram.com/"
            placeholder="username"
            className="sm:col-span-2"
            value={formValues.instagram}
            onChange={handleInputChange}
          />
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Your Photo"
            sublabel="This will be displayed on your profile."
          />
          <div className="sm:col-span-2">
            <AvatarUpload
              limits={{
                maxWidth: 400,
                maxHeight: 400,
                maxSize: 1,
              }}
              aspect={1}
            />
          </div>
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Your Bio"
            sublabel="Write a short introduction."
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <TextEditor
              onChange={(eee) => {
                console.log(eee)
              }}
              placeholder="Add a short bio..."
            />
            <p className="mt-2 text-sm text-gray-500">400 characters left</p>
          </div>
        </InputMain>

        <InputMain className="border-none sm:grid-cols-3">
          <InputMain.Label label="Job title" htmlFor="jobTitle" />
          <InputMain.Input
            id="jobTitle"
            name="jobTitle"
            placeholder="e.g. UI Artist"
            className="sm:col-span-2"
            additionalCheckbox={
              <Checkbox
                id="showJobTitle"
                name="showJobTitle"
                text="Show my job title in my profile"
                className="mt-4"
                labelClassName="font-normal"
                checked={formValues.jobTitle.show}
                onChange={handleInputChange}
              />
            }
            onChange={handleInputChange}
          />
        </InputMain>
      </div>
    </form>
  )
}

MyProfileForm.propTypes = {
  profile: PropTypes.object,
}

export default MyProfileForm
