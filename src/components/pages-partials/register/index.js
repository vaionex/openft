import RegistrationLayout from '@/components/layout/registration-layout'
import { firebaseUploadUserImage } from '@/firebase/utils'
import registrationFormSelector from '@/redux/selectors/registration-form'
import userSelector from '@/redux/selectors/user'
import {
  register,
  setMnemonicPopup,
  setPending,
  updateUser,
} from '@/redux/slices/user'
import { createwallet } from '@/services/relysia-queries'
import getCroppedImg from '@/utils/cropImageUtils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RegistrationAddSocials from './add-socials'
import RegistrationChoosePassword from './choose-password'
import RegistrationDetails from './details'
import RegistrationUploadPhoto from './upload-photo'
import walletSelector from '@/redux/selectors/wallet'
import {
  setDetailsValues,
  setPasswordValues,
  setPhotoValues,
  setReadyToGo,
  setStep,
  // setSocialsValues,
} from '@/redux/slices/registration-form'

const RegistrationFormMain = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { mnemonic, paymail } = useSelector(walletSelector)
  const {
    currentUser,
    isPending,
    isError,
    errorMessage,
    mnemonicPopup: mnemonicStatus,
  } = useSelector(userSelector)
  const {
    detailsValues,
    // socialsValues,
    passwordValues,
    photoValues,
    readyToGo,
    step,
  } = useSelector(registrationFormSelector)

  const isGoogleUser = currentUser?.isGoogleUser || currentUser?.isSocialUser

  useEffect(() => {
    if (readyToGo) {
      registerUser()
    }
  }, [readyToGo])

  useEffect(() => {
    if (isPending) {
      document.body.style.pointerEvents = 'none'
      document.body.style.touchAction = 'none'
    }
    return () => {
      document.body.style.pointerEvents = 'auto'
      document.body.style.touchAction = 'auto'
    }
  }, [isPending])

  const registerUser = async () => {
    dispatch(setPending(true))
    const { coverImage, profileImage } = photoValues
    const coverImageForUpload = coverImage
      ? await getCroppedImg(coverImage, coverImage.croppedAreaPixels)
      : null
    const profileImageForUpload = profileImage
      ? await getCroppedImg(profileImage, profileImage.croppedAreaPixels)
      : null

    const dataForServer = {
      ...detailsValues,
      ...passwordValues,
      // ...socialsValues,
    }

    const updatedValues = {
      username: detailsValues.username,
      name: detailsValues.name,
    }
    try {
      dispatch(
        isGoogleUser
          ? updateUser({
              uid: currentUser.uid,
              values: updatedValues,
              coverImageForUpload,
              profileImageForUpload,
              isGoogleUser,
            })
          : register({
              dataForServer,
              coverImageForUpload,
              profileImageForUpload,
            }),
      )

      if (isError) {
        setPending(false)
        throw new Error(errorMessage)
      }

      if (isGoogleUser) {
        setTimeout(() => {
          dispatch(setPending(false))
          dispatch(setMnemonicPopup(true))
        }, 4000)
      } else {
        dispatch(setPending(false))
        // dispatch(setMnemonicPopup(true))
      }
      document.body.style.pointerEvents = 'auto'
      document.body.style.touchAction = 'auto'
      dispatch(setReadyToGo(false))
    } catch (error) {
      console.log(error.message)
      dispatch(setPending(false))
      document.body.style.pointerEvents = 'auto'
      document.body.style.touchAction = 'auto'
    }
  }

  /// registration end ///

  const goToStep = (step) => {
    dispatch(setStep(step))
  }

  return (
    <RegistrationLayout goToStep={goToStep}>
      {
        {
          1: (
            <RegistrationDetails
              currentUser={currentUser}
              isGoogleUser={isGoogleUser}
              goToStep={goToStep}
            />
          ),
          2: <RegistrationChoosePassword goToStep={goToStep} />,
          3: (
            <RegistrationUploadPhoto
              goToStep={goToStep}
              mnemonicStatus={mnemonicStatus}
              mnemonic={mnemonic}
              paymail={paymail}
              currentUser={currentUser}
              isGoogleUser={isGoogleUser}
            />
          ),
        }[step]
      }
    </RegistrationLayout>
  )
}

export default RegistrationFormMain
