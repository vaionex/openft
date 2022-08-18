/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import AvatarWithName from '@/components/ui/avatars/avatar-w-name'

export const AvatarUpload = ({
  size,
  avatarPathSetter,
  tempAvatarSetter,
  tempAvatar,
}) => {
  const auth = useSelector((state) => state.auth)
  const [uploading, setUploading] = useState(false)

  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const blob = URL.createObjectURL(file)
      tempAvatarSetter(blob)
      avatarPathSetter({ filePath, file })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setUploading(false)
    }
  }

  const renderAvatarImage = () => {
    if (!tempAvatar || auth.user?.photoURL) {
      return (
        <div className="flex justify-center p-2">
          {/* that || name will be deleted when user data comes */}
          <AvatarWithName name={auth.user?.displayName || 'Olivia John'} />
        </div>
      )
    } else if (tempAvatar ?? auth.user?.photoURL) {
      return (
        <div className="flex justify-center p-2">
          <div className="overflow-hidden rounded-full w-14 h-14 ring-offset-base-100 ring-offset-2">
            <Image
              src={tempAvatar ?? auth.user?.photoURL ?? ''}
              alt="avatar preview"
              className="rounded-box"
              width={size}
              height={size}
              objectFit="cover"
            />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="flex items-start justify-between w-full gap-2">
      {renderAvatarImage()}

      <div className="flex">
        <span className="inline-block p-2 text-sm text-gray-500 cursor-pointer">
          Delete
        </span>
        <div className="flex justify-center">
          <label
            className={`cursor-pointer p-2 text-sm font-medium text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              uploading ? 'loading' : ''
            }`}
            htmlFor="single"
          >
            {uploading ? 'Uploading' : 'Update'}
          </label>
          <input
            className="absolute hidden"
            type="file"
            id="single"
            accept="image/*"
            onChange={(e) => uploadAvatar(e)}
            disabled={uploading}
          />
        </div>
      </div>
    </div>
  )
}

AvatarUpload.propTypes = {
  size: PropTypes.number,
  avatarPathSetter: PropTypes.func,
  tempAvatarSetter: PropTypes.func,
  tempAvatar: PropTypes.string,
}

export default AvatarUpload
