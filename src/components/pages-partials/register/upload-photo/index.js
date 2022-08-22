import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CameraIcon } from '@heroicons/react/outline'
import registrationFormSelector from '@/redux/selectors/registration-form'
import ImageUploadDragAndDrop from '@/components/ui/image-upload-drag-n-drop'

const ImageInputAttributes = [
  {
    id: 'profileImage',
    name: 'profileImage',
    text: 'Click to upload profile photo',
    subinfo: 'Max 400x400 - 1MB',
  },
  {
    id: 'coverImage',
    name: 'coverImage',
    text: 'Click to upload cover photo',
    subinfo: 'Max 3840x2160 - 4MB',
  },
]

const RegistrationUploadPhoto = ({ goToStep }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { photoValues } = useSelector(registrationFormSelector)

  return (
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
          <form className="space-y-6">
            {ImageInputAttributes.map((inputAttribute) => (
              <ImageUploadDragAndDrop
                key={inputAttribute.id}
                id={inputAttribute.id}
                name={inputAttribute.name}
                text={inputAttribute.text}
                subinfo={inputAttribute.subinfo}
              />
            ))}

            <div className="flex gap-4">
              <button
                type="button"
                className="w-full font-semibold btn-secondary"
                onClick={() => goToStep(2)}
              >
                Back
              </button>
              <button
                disabled={
                  photoValues?.profileImage === null ||
                  photoValues?.coverImage === null
                }
                type="button"
                className="w-full font-semibold btn-primary"
                onClick={() => goToStep(4)}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationUploadPhoto
