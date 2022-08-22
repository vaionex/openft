import RegistrationLayout from '@/components/layout/registration-layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import RegistrationAddSocials from './add-socials'
import RegistrationChoosePassword from './choose-password'
import RegistrationDetails from './details'
import RegistrationUploadPhoto from './upload-photo'

const RegistrationFormMain = () => {
  const router = useRouter()
  const step = router.query.step ?? router.pathname
  const stepList = ['details', 'choose-password', 'upload-photo', 'add-socials']

  const goToStep = (step) => {
    router.push(`${router.pathname}?step=${step}`)
  }

  useEffect(() => {
    if (stepList.length < step) {
      router.push('/')
    }

    if (router.asPath === '/register') {
      router.replace('/register?step=1')
    }
  }, [])

  const renderComponent = () => {
    switch (step) {
      case '1':
        return <RegistrationDetails goToStep={goToStep} />
      case '2':
        return <RegistrationChoosePassword goToStep={goToStep} />
      case '3':
        return <RegistrationUploadPhoto goToStep={goToStep} />
      case '4':
        return <RegistrationAddSocials goToStep={goToStep} />
      default:
        return <RegistrationDetails goToStep={goToStep} />
    }
  }

  return (
    <RegistrationLayout goToStep={goToStep}>
      {renderComponent()}
    </RegistrationLayout>
  )
}

export default RegistrationFormMain
