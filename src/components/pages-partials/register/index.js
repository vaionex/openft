import RegistrationLayout from '@/components/layout/registration-layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import RegistrationAddSocials from './add-socials'
import RegistrationChoosePassword from './choose-password'
import RegistrationDetails from './details'
import RegistrationUploadPhoto from './upload-photo'

const RegistrationFormMain = () => {
  const router = useRouter()
  const step = router.query.step ?? '1'

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
