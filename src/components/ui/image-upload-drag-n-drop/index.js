import { UploadIcon } from '@/components/common/icons'
import registrationFormSelector from '@/redux/selectors/registration-form'
import { clearPhotoValues } from '@/redux/slices/registration-form'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import ImageUploadReviewCard from '../cards/image-upload-review-card'
import ImageCropper from '../image-cropper'
import { checkValidation } from './validations'

// eslint-disable-next-line react/display-name
const ImageUploadDragAndDrop = ({
  id,
  text,
  subinfo,
  acceptableFileTypes,
  ...props
}) => {
  const dispatch = useDispatch()
  const { photoValues } = useSelector(registrationFormSelector)
  const [selectedImage, setSelectedImage] = useState('')
  const [isCropping, setIsCropping] = useState(false)
  const [errorMap, setErrorMap] = useState(null)

  const cleanUpState = () => {
    setSelectedImage(null)
    setErrorMap(null)
    dispatch(clearPhotoValues(id))
  }

  const IMAGE_SIZE_LIMIT =
    id === 'profileImage' ? 1 * 1000 * 1000 : 4 * 1000 * 1000

  const IMAGE_RESOLUTION_LIMIT = {
    width: id === 'profileImage' ? 400 : 3840,
    height: id === 'profileImage' ? 400 : 2160,
  }

  const validateImage = async (file) => {
    return await checkValidation(
      file,
      acceptableFileTypes,
      IMAGE_SIZE_LIMIT,
      IMAGE_RESOLUTION_LIMIT,
    )
  }

  const onDrop = useCallback(async (files) => {
    cleanUpState()
    const imageFile = files[0]

    const errorObjects = await validateImage(imageFile)

    if (!errorObjects) {
      const createFileUrl = URL.createObjectURL(imageFile)
      setSelectedImage({
        src: createFileUrl,
        name: imageFile.name,
        ext: imageFile.name.split(/\.(?=[^\.]+$)/)[1],
      })
      setIsCropping(true)
    } else {
      setErrorMap(errorObjects)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <>
      {photoValues[id] ? (
        <ImageUploadReviewCard id={id} cleanUpState={cleanUpState} />
      ) : (
        <>
          <div
            className={twMerge(
              'mt-1 cursor-pointer sm:mt-0 sm:col-span-2',
              isCropping && 'pointer-events-none',
            )}
            {...(!isCropping && { ...getRootProps() })}
          >
            <div className="flex justify-center w-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-gray-50">
                  <UploadIcon width={20} height={20} />
                </div>
                <div className="flex justify-center text-sm text-gray-600">
                  <label
                    htmlFor={id}
                    className="relative font-medium text-blue-600 bg-white rounded-md hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>{text}</span>
                    <input accept={acceptableFileTypes} {...getInputProps()} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  File types supported: JPG, PNG, WEBP
                </p>
                {subinfo && <p className="text-xs text-gray-500">{subinfo}</p>}
              </div>
            </div>
            <div className="mt-2 text-xs text-red-600 ">
              <span className="text-xs text-red-600 ">{errorMap?.message}</span>
            </div>

            {isCropping && (
              <ImageCropper
                id={id}
                image={selectedImage}
                aspect={id === 'coverImage' ? 191 / 48 : 1}
                isCropping={isCropping}
                setIsCropping={setIsCropping}
              />
            )}
          </div>
        </>
      )}
    </>
  )
}

ImageUploadDragAndDrop.defaultProps = {
  text: 'Click to upload',
  subinfo: '',
  acceptableFileTypes: 'image/jpeg, image/png, image/webp',
}

ImageUploadDragAndDrop.propTypes = {
  text: PropTypes.string,
  subinfo: PropTypes.node,
}

export default ImageUploadDragAndDrop
