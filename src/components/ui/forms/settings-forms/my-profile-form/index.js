import AvatarUpload from '@/components/ui/avatar-upload'
import Checkbox from '@/components/ui/checkbox'
import { InputMain } from '@/components/ui/inputs'
import PropTypes from 'prop-types'
import { useState } from 'react'

const MyProfileForm = ({
  user,
  formValues,
  setFormValues,
  errorMessage,
  setErrorMessage,
  isError,
  setIsError,
}) => {
  const BIO_MAX_LENGTH = 400

  const validateUsername = (username) => {
    const usernameRegex = /^[a-z0-9]+$/i

    if (username.length === 0) {
      setIsError(true)
      return 'Username is required'
    } else if (!usernameRegex.test(username)) {
      setIsError(true)
      return 'Username can only contain lowercase letters and numbers'
    } else {
      setIsError(false)
      return null
    }
  }

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target

    if (name === 'username') {
      setErrorMessage(validateUsername(value))
    }

    if (name === 'bio') {
      if (value.length <= BIO_MAX_LENGTH) {
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
        }))
      }
    } else if (name === 'showJobTitle') {
      setFormValues((prev) => {
        return {
          ...prev,
          [name]: checked,
        }
      })
    } else {
      setFormValues((prev) => {
        return {
          ...prev,
          [name]: value,
        }
      })
    }
  }

  return (
    <form className="mt-12 space-y-8 divide-y divide-gray-200">
      <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Username"
            htmlFor="username"
            className="sm:w-[280px]"
          />
          <InputMain.Input
            id="username"
            name="username"
            variant="add-on"
            addon="open.nft/"
            placeholder="username"
            className="sm:w-full sm:max-w-[666px]"
            inputContainer="md:h-11"
            value={formValues.username}
            onChange={handleInputChange}
            error={errorMessage}
          />
        </InputMain>

        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Instagram"
            htmlFor="instagram"
            className="sm:w-[280px]"
          />

          <InputMain.Input
            id="instagram"
            name="instagram"
            variant="add-on"
            addon="https://instagram.com/"
            placeholder="username"
            className="sm:w-full sm:max-w-[666px]"
            inputContainer="md:h-11"
            value={formValues.instagram}
            onChange={handleInputChange}
          />
        </InputMain>

        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Facebook"
            htmlFor="facebook"
            className="sm:w-[280px]"
          />

          <InputMain.Input
            id="facebook"
            name="facebook"
            variant="add-on"
            addon="https://facebook.com/"
            placeholder="username"
            className="sm:w-full sm:max-w-[666px]"
            inputContainer="md:h-11"
            value={formValues.facebook}
            onChange={handleInputChange}
          />
        </InputMain>

        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Website"
            htmlFor="website"
            className="sm:w-[280px]"
          />

          <InputMain.Input
            id="website"
            name="website"
            variant="add-on"
            addon="https://"
            placeholder="yourwebsite.com"
            className="sm:w-full sm:max-w-[666px]"
            inputContainer="md:h-11"
            value={formValues.website}
            onChange={handleInputChange}
          />
        </InputMain>

        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Your Photo"
            sublabel="This will be displayed on your profile."
            htmlFor="avatar"
            className="sm:w-[280px]"
          />
          <div className="sm:w-full sm:max-w-[666px]">
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

        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Your Bio"
            sublabel="Write a short introduction."
            htmlFor="bio"
            className="sm:w-[280px]"
          />
          <div className="mt-1 sm:mt-0 sm:w-full sm:max-w-[666px]">
            <textarea
              className="w-full p-3 border border-gray-200 rounded min-h-[154px] resize-none"
              placeholder="Add a short bio..."
              name="bio"
              value={formValues.bio}
              onChange={handleInputChange}
              maxLength={BIO_MAX_LENGTH}
            ></textarea>
            <p className="mt-2 text-sm text-[#667085]">
              {BIO_MAX_LENGTH - formValues?.bio.length} characters left
            </p>
          </div>
        </InputMain>

        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Job title"
            htmlFor="jobTitle"
            className="sm:w-[280px]"
          />
          <InputMain.Input
            id="jobTitle"
            name="jobTitle"
            placeholder="e.g. UI Artist"
            className="sm:w-full sm:max-w-[666px]"
            inputContainer="md:h-11"
            value={formValues.jobTitle}
            additionalCheckbox={
              <Checkbox
                id="showJobTitle"
                name="showJobTitle"
                text="Show my job title in my profile"
                className="mt-4"
                labelClassName="font-normal"
                checked={formValues.showJobTitle}
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
