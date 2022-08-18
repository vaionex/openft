import { UploadIcon } from '@/components/common/icons'
import base64StringToBlob from '@/utils/base64StringToBlob'
import base64toFile from '@/utils/base64ToFile'
import imageFileToBase64 from '@/utils/imageFileToBase64'
import PropTypes from 'prop-types'
import { forwardRef, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'
import ImageUploadReviewCard from '../cards/image-upload-review-card'
import ImageCropper from '../image-cropper'

// eslint-disable-next-line react/display-name
const ImageUploadDragAndDrop = ({
  id,
  text,
  subinfo,
  acceptableFileTypes,
  ...props
}) => {
  const [selectedImage, setSelectedImage] = useState({})
  const [crop, setCrop] = useState({
    unit: 'px',
    width: 200,
    height: 200,
    x: 200,
    y: 100,
    aspect: 1 / 1,
  })
  const [croppedImage, setCroppedImage] = useState({})
  const [isCropping, setIsCropping] = useState(false)

  const onDrop = useCallback(async (accepted, rejected) => {
    setSelectedImage({})
    if (accepted?.length > 0) {
      const currentImage = accepted[0]
      const base64Image = await imageFileToBase64(currentImage)
      setSelectedImage({
        file: {
          src: base64Image,
          name: currentImage.name,
          type: currentImage.type,
          size: currentImage.size,
        },
        error: [],
      })

      setIsCropping(true)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  // crop functions

  const handleOnCropImageLoaded = (image) => {
    console.log(image, 'imageeeeeee')
  }

  const handeOnCropChange = useCallback((crop) => {
    setCrop(crop)
  }, [])

  const handleOnCropComplete = useCallback((crop, pixelCrop) => {
    console.log(crop, 'crop')
    console.log(pixelCrop, 'pixelCrop')
    console.log(selectedImage, 'selectedImage')
    const croppedImage = base64toFile(
      selectedImage?.file?.src,
      selectedImage?.file?.name,
    )
    console.log(croppedImage, 'croppedImage')
  }, [])

  // end crop functions

  return (
    <>
      <div className="mb-4">
        <ImageUploadReviewCard image={selectedImage} collection={id} />
      </div>
      <div
        className={twMerge(
          'mt-1 cursor-pointer sm:mt-0 sm:col-span-2',
          isCropping && 'pointer-events-none',
        )}
        {...getRootProps()}
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
                <input {...getInputProps()} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              File types supported: JPG, PNG, WEBP
            </p>
            {subinfo && <p className="text-xs text-gray-500">{subinfo}</p>}
          </div>
        </div>

        {isCropping && (
          <ImageCropper
            file={selectedImage?.file}
            crop={crop}
            isCropping={isCropping}
            setIsCropping={setIsCropping}
            onCropChange={handeOnCropChange}
            onCropComplete={handleOnCropComplete}
            onCropImageLoaded={handleOnCropImageLoaded}
          />
        )}
      </div>
    </>
  )
}

ImageUploadDragAndDrop.defaultProps = {
  text: 'Click to upload',
  subinfo: '',
  acceptableFileTypes:
    'image/jpeg, image/jpg, image/png, image/gif, image/webp',
}

ImageUploadDragAndDrop.propTypes = {
  text: PropTypes.string,
  subinfo: PropTypes.node,
}

export default ImageUploadDragAndDrop
