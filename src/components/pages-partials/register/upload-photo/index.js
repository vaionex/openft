import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CameraIcon } from '@heroicons/react/outline'
import RegistrationLayout from '@/components/layout/registration-layout'
import registrationFormSelector from '@/redux/selectors/registration-form'
import ImageUploadDragAndDrop from '@/components/ui/image-upload-drag-n-drop'
import { useState } from 'react'

const ImageInputAttributes = [
  {
    id: 'profileImage',
    name: 'profileImage',
    text: 'Click to upload profile photo',
    subinfo: 'Max 400x400 - 500KB',
  },
  {
    id: 'coverImage',
    name: 'coverImage',
    text: 'Click to upload cover photo',
    subinfo: 'Max 1440x900 - 2MB',
  },
]

const RegistrationUploadPhoto = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { photoValues } = useSelector(registrationFormSelector)

  console.log(photoValues, 'photoValues')

  const onSubmit = (data) => {
    console.log('data', data)
  }

  return (
    <RegistrationLayout>
      <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <CameraIcon className="w-auto rounded-full mx-auto p-3 bg-blue-50 text-blue-600 h-14 stroke-[1.5]" />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Upload your photo
          </h2>
          <p className="mt-4 text-center">
            Beautify your profile, it also will
            <br /> be visible to the public
          </p>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              <span className="inline-block w-full">
                {ImageInputAttributes.map((inputAttribute) => (
                  <ImageUploadDragAndDrop
                    key={inputAttribute.id}
                    id={inputAttribute.id}
                    name={inputAttribute.name}
                    text={inputAttribute.text}
                    subinfo={inputAttribute.subinfo}
                  />
                ))}
              </span>

              <button
                disabled={
                  photoValues.profileImage === '' ||
                  photoValues.coverImage === ''
                }
                type="submit"
                className="w-full font-semibold btn-primary"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </RegistrationLayout>
  )
}

export default RegistrationUploadPhoto
