/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import AvatarWithName from '@/components/ui/avatars/avatar-w-name'
import authSelector from '@/redux/selectors/auth'
import ImageCropper from '../image-cropper'
import { checkValidation } from '@/utils/imageValidation'
import getFileExt from '@/utils/getFileExt'
import { firebaseUploadImage } from '@/firebase/utils'
import getCroppedImg from '@/utils/cropImageUtils'
import { useCallback } from 'react'

export const AvatarUpload = ({ limits, aspect, acceptableFileTypes }) => {
  const { user } = useSelector(authSelector)
  const [isCropping, setIsCropping] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [errorMap, setErrorMap] = useState(null)

  const IMAGE_SIZE_LIMIT = limits.maxSize * 1000 * 1000
  const IMAGE_RESOLUTION_LIMIT = {
    width: limits.maxWidth,
    height: limits.maxHeight,
  }

  const validateImage = async (file) => {
    return await checkValidation(
      file,
      acceptableFileTypes,
      IMAGE_SIZE_LIMIT,
      IMAGE_RESOLUTION_LIMIT,
    )
  }

  const setImageState = async ({ id, file, croppedBlobFile }) => {
    try {
      await firebaseUploadImage({
        user,
        imageFile: croppedBlobFile,
        imageType: id,
        ext: file.ext,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = useCallback(async (e) => {
    const imageFile = e.target.files[0]

    const errorObjects = await validateImage(imageFile)

    if (!errorObjects) {
      const createFileUrl = URL.createObjectURL(imageFile)
      setSelectedImage({
        src: createFileUrl,
        name: imageFile.name,
        ext: getFileExt(imageFile.name),
      })
      setIsCropping(true)
    } else {
      setErrorMap(errorObjects)
    }
  }, [])

  const clearEventValue = (e) => {
    e.target.value = ''
  }

  return (
    <div className="flex items-start justify-between w-full gap-2">
      <div className="flex justify-center p-2">
        <div className="relative overflow-hidden bg-blue-700 rounded-full w-14 h-14 ring-offset-base-100 ring-offset-2">
          {user?.profileImage ? (
            <Image
              src={user.profileImage}
              alt="avatar preview"
              className="rounded-box"
              objectFit="cover"
              layout="fill"
            />
          ) : (
            <AvatarWithName name={user?.name} />
          )}
        </div>
      </div>

      <div className="flex">
        {user?.profileImage && (
          <span className="inline-block p-2 text-sm text-gray-500 cursor-pointer">
            Delete
          </span>
        )}
        <div className="flex justify-center">
          <label
            className={`cursor-pointer p-2 text-sm font-medium text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              uploading ? 'loading' : ''
            }`}
            htmlFor="profileImage"
          >
            {user?.profileImage
              ? uploading
                ? 'Uploading'
                : 'Update'
              : 'Upload'}
          </label>
          <input
            className="absolute hidden"
            type="file"
            id="profileImage"
            accept={acceptableFileTypes}
            onChange={(e) => handleOnChange(e)}
            onClick={clearEventValue}
            disabled={uploading}
          />
        </div>
      </div>
      {isCropping && (
        <ImageCropper
          id="profileImage"
          image={selectedImage}
          aspect={aspect}
          isCropping={isCropping}
          setIsCropping={setIsCropping}
          setToState={setImageState}
        />
      )}
    </div>
  )
}

AvatarUpload.defaultProps = {
  acceptableFileTypes: ['PNG', 'JPEG', 'JPG', 'WEBP'],
}

AvatarUpload.propTypes = {
  acceptableFileTypes: PropTypes.array,
  limits: PropTypes.shape({
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    maxSize: PropTypes.number,
  }),
}

export default AvatarUpload
