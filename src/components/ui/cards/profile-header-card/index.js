import Image from 'next/image'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarWithName } from '@/components/ui/avatars'
import ButtonWLoading from '@/components/ui/button-w-loading'
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import { useCallback, useState } from 'react'
import { firebaseDeleteImage, firebaseUploadUserImage } from '@/firebase/utils'
import ModalConfirm from '../../modal-confirm'
import Spinner from '../../spinner'
import { checkValidation } from '@/utils/imageValidation'
import getFileExt from '@/utils/getFileExt'
import ImageCropper from '../../image-cropper'
import NextLink from 'next/link'

const ProfileHeaderCard = ({
  user,
  isPending,
  isSuccess,
  onSubmit,
  isError,
  acceptableFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
}) => {
  const { currentUser } = useSelector(userSelector)
  const [isCropping, setIsCropping] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [errorMap, setErrorMap] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const IMAGE_SIZE_LIMIT = 4 * 1000 * 1000
  const IMAGE_ASPECT = 191 / 48
  const IMAGE_RESOLUTION_LIMIT = {
    width: 3840,
    height: 2160,
  }

  const validateImage = async (file) => {
    return await checkValidation(
      file,
      ['PNG', 'JPEG', 'JPG', 'WEBP'],
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
      alert(errorObjects.message)
    }
  }, [])

  const clearEventValue = (e) => {
    e.target.value = ''
  }

  const handleOnDelete = async () => {
    const uid = currentUser?.uid
    try {
      const img = await firebaseDeleteImage({ uid, imageType: 'coverImage' })
      console.log(img)
      setIsDeleteModalOpen(false)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <div className="relative w-full h-32 overflow-hidden rounded-lg group bg-gradient-to-tr opacity-80 from-blue-600 to-blue-300 lg:h-60">
        {user?.coverImage && (
          <Image
            src={user?.coverImage}
            alt={user?.name}
            layout="fill"
            objectFit="cover"
          />
        )}
        {currentUser?.coverImage && (
          <div className="absolute hidden gap-1 group-hover:flex top-2 right-2">
            <div
              className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow-sm cursor-pointer bg-opacity-30"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <TrashIcon className="w-5 h-5 text-white" />
            </div>

            <label
              className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow-sm cursor-pointer bg-opacity-30"
              htmlFor="cover"
            >
              <PencilIcon className="w-5 h-5 text-white" />
            </label>
            <input
              className="absolute hidden"
              type="file"
              id="cover"
              accept={acceptableFileTypes}
              onChange={(e) => handleOnChange(e)}
              onClick={clearEventValue}
              disabled={uploading}
            />
          </div>
        )}
        {!uploading && !currentUser?.coverImage && (
          <>
            <label
              className="absolute inset-0 flex items-center justify-center bg-white rounded-md shadow-sm cursor-pointer bg-opacity-30"
              htmlFor="cover"
            >
              <PlusCircleIcon className="w-12 h-12 text-white" />
            </label>
            <input
              className="absolute hidden"
              type="file"
              id="cover"
              accept={acceptableFileTypes}
              onChange={(e) => handleOnChange(e)}
              onClick={clearEventValue}
              disabled={uploading}
            />
          </>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-md shadow-sm cursor-pointer bg-opacity-30">
            <Spinner className="w-12 h-12 mr-0 text-white" />
          </div>
        )}
      </div>
      <div className="sm:px-6 lg:px-8">
        <div className="flex items-end -mt-12 sm:-mt-10 sm:space-x-5">
          {user ? (
            user.profileImage ? (
              <Avatar
                className="w-24 h-24 ml-4 bg-blue-700 sm:w-32 sm:h-32"
                user={user}
              />
            ) : (
              <AvatarWithName
                className="w-24 h-24 ml-4 text-xl sm:w-32 sm:h-32"
                name={user.name}
              />
            )
          ) : (
            <AvatarWithName className="w-24 h-24 ml-4 sm:w-32 sm:h-32 " />
          )}

          <div className="flex items-center justify-end flex-1 mt-6 sm:min-w-0 space-x-4 sm:pb-1">
            <div className="flex-1 hidden min-w-0 mb-6 sm:mb-0 md:block">
              <h2 className="mb-1 text-2xl font-medium text-gray-900 truncate">
                {user?.name}
              </h2>
              {user?.jobTitle && user?.showJobTitle && (
                <h3 className="font-normal text-gray-500">{user?.jobTitle}</h3>
              )}
            </div>
            <div className="flex flex-col items-center justify-stretch sm:mr-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <NextLink href="/">
                <a className="text-sm font-medium hover:text-gradient-primary-hover px-[16px] py-[9px] border border-solid rounded-lg border-[#D0D5DD] hover:shadow-[0_0px_1px_2px_rgba(16,24,40,0.05)]">
                  Cancel
                </a>
              </NextLink>
            </div>
            <div className="flex flex-col items-center space-y-3 justify-stretch sm:flex-row sm:space-y-0">
              {isSuccess && (
                <span className="text-xs text-green-500">
                  Profile successfully updated.{' '}
                </span>
              )}
              <ButtonWLoading
                isError={isError}
                isPending={isPending}
                text="Save"
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 block min-w-0 mt-6 md:hidden">
          <h2 className="text-2xl font-medium text-gray-900 truncate">
            {user?.name}
          </h2>
          <h3 className="font-normal text-gray-500">{user?.title}</h3>
        </div>
      </div>
      {isCropping && (
        <ImageCropper
          id="coverImage"
          image={selectedImage}
          aspect={IMAGE_ASPECT}
          isCropping={isCropping}
          setIsCropping={setIsCropping}
          setToState={setImageState}
        />
      )}
      <ModalConfirm
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleOnDelete}
        isOpen={isDeleteModalOpen}
        title="Delete Cover Image"
        content="Are you sure you want to delete cover image?"
      />
    </div>
  )
}

ProfileHeaderCard.propTypes = {
  user: PropTypes.object,
}

export default ProfileHeaderCard
