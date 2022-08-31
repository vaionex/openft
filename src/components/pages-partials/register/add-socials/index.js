/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '@/redux/slices/user'
import { InputMain } from '@/components/ui/inputs'
import { UsersCircleIcon } from '@/components/common/icons'
import { Controller, useForm } from 'react-hook-form'
import registrationFormSelector from '@/redux/selectors/registration-form'
import { setSocialsValues } from '@/redux/slices/registration-form'
import { firebaseUploadImage } from '@/firebase/utils'
import getCroppedImg from '@/utils/cropImageUtils'
import { twMerge } from 'tailwind-merge'
import { createwallet } from '@/services/relysia-queries'
import userSelector from '@/redux/selectors/user'
import ButtonWLoading from '@/components/ui/button-w-loading'

const inputAttributes = [
  {
    id: 'instagram',
    type: 'text',
    addon: 'http://instagram.com/',
    placeholder: 'username',
    name: 'instagram',
  },
  {
    id: 'facebook',
    type: 'text',
    addon: 'http://facebook.com/',
    placeholder: 'username',
    name: 'facebook',
  },
  {
    id: 'website',
    type: 'text',
    addon: 'http://',
    placeholder: 'yourwebsite.com',
    name: 'website',
  },
]

function RegistrationAddSocials({ goToStep }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isPending } = useSelector(userSelector)
  const [submitStarted, setSubmitStarted] = useState(false)
  const registrationValues = useSelector(registrationFormSelector)
  const { photoValues } = registrationValues
  const { control, handleSubmit, formState } = useForm({
    defaultValues: registrationValues.socialValues,
  })

  const onSubmit = async (data) => {
    setSubmitStarted(true)
    dispatch(setSocialsValues(data))

    const dataForServer = {
      ...registrationValues.detailsValues,
      ...registrationValues.passwordValues,
      ...data,
    }

    const coverImageForUpload = await getCroppedImg(
      photoValues.coverImage,
      photoValues.coverImage.croppedAreaPixels,
    )
    const profileImageForUpload = await getCroppedImg(
      photoValues.profileImage,
      photoValues.profileImage.croppedAreaPixels,
    )

    dispatch(register(dataForServer))
      .then(async ({ payload }) => {
        document.body.style.pointerEvents = 'auto'
        document.body.style.touchAction = 'auto'
        await firebaseUploadImage({
          user: payload,
          imageFile: coverImageForUpload.file,
          imageType: 'coverImage',
          ext: photoValues.coverImage.ext,
        })
        await firebaseUploadImage({
          user: payload,
          imageFile: profileImageForUpload.file,
          imageType: 'profileImage',
          ext: photoValues.profileImage.ext,
        })
        await createwallet('default', dispatch)
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setSubmitStarted(false)
      })
  }

  useEffect(() => {
    if (isPending) {
      document.body.style.pointerEvents = 'none'
      document.body.style.touchAction = 'none'
    }
  }, [isPending])

  return (
    <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <UsersCircleIcon className="w-auto mx-auto rounded-full h-14" />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Add your socials
        </h2>
        <p className="mt-4 text-center">
          You are welcome to link to your own webpage <br /> with more details.
        </p>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            {inputAttributes.map((inputAttribute) => (
              <InputMain
                key={inputAttribute.name}
                className="relative pb-0 border-none"
              >
                <Controller
                  name={inputAttribute.name}
                  control={control}
                  render={({ field }) => (
                    <InputMain.Input
                      id={inputAttribute.name}
                      variant="add-on"
                      addon={inputAttribute.addon}
                      placeholder={inputAttribute.placeholder}
                      className="mb-8 sm:mb-4"
                      type={inputAttribute.type}
                      {...field}
                    />
                  )}
                />
              </InputMain>
            ))}

            <div className="flex gap-4">
              <button
                type="button"
                className="w-full font-semibold btn-secondary"
                onClick={() => goToStep(3)}
              >
                Back
              </button>
              <ButtonWLoading
                isError={isError}
                isPending={isPending}
                text="Finish"
                onClick={handleSubmit(onSubmit)}
                fullWidth
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationAddSocials
