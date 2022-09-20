import RegistrationLayout from '@/components/layout/registration-layout'
import { firebaseUploadUserImage } from '@/firebase/utils'
import registrationFormSelector from '@/redux/selectors/registration-form'
import userSelector from '@/redux/selectors/user'
import { register, setPending } from '@/redux/slices/user'
import { createwallet } from '@/services/relysia-queries'
import getCroppedImg from '@/utils/cropImageUtils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RegistrationAddSocials from './add-socials'
import RegistrationChoosePassword from './choose-password'
import RegistrationDetails from './details'
import RegistrationUploadPhoto from './upload-photo'

const RegistrationFormMain = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const step = router.query.step ?? '1'
  const { isPending, isError, errorMessage } = useSelector(userSelector)
  const {
    detailsValues,
    socialsValues,
    passwordValues,
    photoValues,
    readyToGo,
  } = useSelector(registrationFormSelector)

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
  }, [isPending])

  const registerUser = async () => {
    setPending(true)
    const { coverImage, profileImage } = photoValues
    const coverImageForUpload = await getCroppedImg(
      coverImage,
      coverImage.croppedAreaPixels,
    )
    const profileImageForUpload = await getCroppedImg(
      profileImage,
      profileImage.croppedAreaPixels,
    )

    const dataForServer = {
      ...detailsValues,
      ...passwordValues,
      ...socialsValues,
    }

    try {
      await dispatch(
        register({
          dataForServer,
          coverImageForUpload,
          profileImageForUpload,
        }),
      )

      if (isError) {
        setPending(false)
        throw new Error(errorMessage)
      }

      dispatch(setPending(false))
      document.body.style.pointerEvents = 'auto'
      document.body.style.touchAction = 'auto'
      router.push('/')
    } catch (error) {
      console.alert(error.message)
      dispatch(setPending(false))
      document.body.style.pointerEvents = 'auto'
      document.body.style.touchAction = 'auto'
    }
  }

  /// registration end ///

  const goToStep = (step) => {
    router.push(`${router.pathname}?step=${step}`)
  }

  const renderComponent = () => {
    if (step === '1') return <RegistrationDetails goToStep={goToStep} />
    if (step === '2') return <RegistrationChoosePassword goToStep={goToStep} />
    if (step === '3') return <RegistrationUploadPhoto goToStep={goToStep} />
    if (step === '4') return <RegistrationAddSocials goToStep={goToStep} />

    router.push('/')
  }

  return (
    <RegistrationLayout goToStep={goToStep}>
      {renderComponent()}
    </RegistrationLayout>
  )
}

export default RegistrationFormMain
