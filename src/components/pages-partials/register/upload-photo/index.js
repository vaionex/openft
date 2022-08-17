import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@/components/ui/alert'
import { CameraIcon } from '@heroicons/react/outline'
import ImageUpload from '@/components/ui/forms/settings-parts/image-upload'
import RegistrationLayout from '@/components/layout/registration-layout'
import { Controller, useForm } from 'react-hook-form'
import registrationFormSelector from '@/redux/selectors/registration-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import * as yup from 'yup'
import { setPhotoValues } from '@/redux/slices/registration-form'
import checkImageResolution from '@/utils/checkImageResolution'
import { useEffect, useState } from 'react'

const COVER_IMAGE_SIZE = 4 * 1024 * 1024
const PROFILE_IMAGE_SIZE = 1 * 1024 * 1024
const PROFILE_IMAGE_WIDTH = 400
const PROFILE_IMAGE_HEIGHT = 400

const validationSchema = yup.object().shape({
  profileImage: yup
    .mixed()
    .required('Profile image is required')
    .test(
      'profileImageSize',
      `Profile Image size must be less than ${
        PROFILE_IMAGE_SIZE / 1024 / 1024
      }MB`,
      (value) => value.length && value[0].size < PROFILE_IMAGE_SIZE,
    ),
  coverImage: yup
    .mixed()
    .required('Cover image is required')
    .test(
      'coverImageSize',
      `Cover Image size must be less than ${COVER_IMAGE_SIZE / 1024 / 1024}MB`,
      (value) => {
        return value.length && value[0].size <= COVER_IMAGE_SIZE
      },
    ),
})

const RegistrationUploadPhoto = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const { photoValues } = useSelector(registrationFormSelector)

  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, formState, register, control, watch } = useForm({
    // mode: 'onChange',
    defaultValues: photoValues,
    resolver,
  })

  const { isSubmitting, isValid, errors } = formState

  console.log(isValid)

  const onSubmit = (data) => {
    console.log('data', data)
    // dispatch(setPhotoValues(data))
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
        <div className="flex justify-center pt-2">
          {auth.errorMessage && (
            <Alert message={auth.errorMessage} type="error" />
          )}
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <span className="inline-block w-full">
                <ImageUpload
                  type="file"
                  id="profileImage"
                  text="Click to upload profile photo"
                  subinfo="Max 400x400"
                  {...register('profileImage')}
                />
                <span className="text-xs text-red-600 ">
                  <span className="text-xs text-red-600 ">
                    {errors?.profileImage?.message}
                  </span>
                </span>
              </span>

              <span className="inline-block w-full">
                <ImageUpload
                  type="file"
                  id="coverImage"
                  text="Click to upload profile photo"
                  subinfo="Max 400x400"
                  {...register('coverImage')}
                />
                <span className="text-xs text-red-600 ">
                  <span className="text-xs text-red-600 ">
                    {errors?.coverImage?.message}
                  </span>
                </span>
              </span>

              <button
                disabled={isSubmitting || !isValid}
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
