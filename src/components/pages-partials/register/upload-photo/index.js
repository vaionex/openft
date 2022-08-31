import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CameraIcon } from '@heroicons/react/outline'
import registrationFormSelector from '@/redux/selectors/registration-form'
import ImageUploadDragAndDrop from '@/components/ui/image-upload-drag-n-drop'
import {
  clearPhotoValues,
  setPhotoValues,
} from '@/redux/slices/registration-form'

const ImageInputAttributes = [
  {
    id: 'profileImage',
    name: 'profileImage',
    text: 'Click to upload profile photo',
    subinfo: 'Max 400x400 - 1MB',
    limits: {
      maxWidth: 400,
      maxHeight: 400,
      maxSize: 1, //MB
    },
    aspect: 1,
  },
  {
    id: 'coverImage',
    name: 'coverImage',
    text: 'Click to upload cover photo',
    subinfo: 'Max 3840x2160 - 4MB',
    limits: {
      maxWidth: 3840,
      maxHeight: 2160,
      maxSize: 4, //MB
    },
    aspect: 191 / 48,
  },
]

const RegistrationUploadPhoto = ({ goToStep }) => {
  const dispatch = useDispatch()
  const { photoValues } = useSelector(registrationFormSelector)

  const handleClear = (id) => {
    dispatch(clearPhotoValues(id))
  }

  const setImageToState = ({ id, file }) => {
    dispatch(
      setPhotoValues({
        [id]: { ...file },
      }),
    )
  }

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
                limits={inputAttribute.limits}
                aspect={inputAttribute.aspect}
                handleClear={() => handleClear(inputAttribute.id)}
                isSelected={!!photoValues[inputAttribute.id]}
                setImageToState={setImageToState}
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
