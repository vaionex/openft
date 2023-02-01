/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import AvatarWithName from '@/components/ui/avatars/avatar-w-name'
import ImageCropper from '../image-cropper'
import { checkValidation } from '@/utils/imageValidation'
import getFileExt from '@/utils/getFileExt'
import { firebaseDeleteImage, firebaseUploadUserImage } from '@/firebase/utils'
import { useCallback } from 'react'
import ModalConfirm from '../modal-confirm'
import userSelector from '@/redux/selectors/user'

export const AvatarUpload = ({ limits, aspect, acceptableFileTypes }) => {
  const { currentUser } = useSelector(userSelector)
  const [isCropping, setIsCropping] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [errorMap, setErrorMap] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
    setUploading(true)
    try {
      await firebaseUploadUserImage({
        user: currentUser,
        imageFile: croppedBlobFile,
        imageType: id,
      })
      setUploading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = useCallback(async (e) => {
    setErrorMap(null)
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

  const handleOnDelete = async () => {
    const uid = currentUser?.uid
    try {
      await firebaseDeleteImage({ uid, imageType: 'profileImage' })
      setIsDeleteModalOpen(false)
    } catch (error) {
      alert(error.message)
    }
  }

  const renderProfile = () => {
    const userData = _.clone(currentUser) ? _.clone(currentUser) : {}
    userData.profileImage = userData?.profileImage
      ? userData?.profileImage
      : userData?.googleProfileImg
      ? userData?.googleProfileImg
      : ''
    return userData?.profileImage ? (
      <Image
        src={userData?.profileImage}
        alt="avatar preview"
        className="rounded-box"
        objectFit="cover"
        layout="fill"
        priority
      />
    ) : (
      <AvatarWithName name={userData?.name} />
    )
  }

  return (
    <>
      <div className="flex items-start justify-between w-full gap-2">
        <div className="flex justify-center p-2">
          <div className="relative overflow-hidden bg-blue-700 rounded-full w-14 h-14 ring-offset-base-100 ring-offset-2">
            {renderProfile()}
          </div>
        </div>

        <div className="flex">
          {currentUser?.profileImage && !uploading && (
            <span
              className="inline-block p-2 text-sm text-gray-500 cursor-pointer"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </span>
          )}
          <div className="flex justify-center">
            {uploading && (
              <span className="p-2 text-sm font-medium text-blue-700 ">
                Uploading...
              </span>
            )}

            {!uploading && (
              <>
                <label
                  className="p-2 text-sm font-medium text-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  htmlFor="profileImage"
                >
                  {currentUser?.profileImage ? 'Update' : 'Upload'}
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
              </>
            )}
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

        <ModalConfirm
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleOnDelete}
          isOpen={isDeleteModalOpen}
          title="Delete Profile Image"
          content="Are you sure you want to delete the photo?"
        />
      </div>
      <div className="mt-2 text-xs text-red-600 text-start">
        <span className="text-xs text-red-600 ">{errorMap?.message}</span>
      </div>
    </>
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
