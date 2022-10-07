import ResetPasswordLayout from '@/components/layout/reset-password'
import { firebaseResetPassword } from '@/firebase/utils'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import ResetSendEmail from './send-email'
import ResetNewPassword from './new-password'
import { useRouter } from 'next/router'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, 'Email is not valid')
    .required('Email is required'),
})

const ResetPasswordMain = () => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorFromServer, setErrorFromServer] = useState('')
  const step = router.query.step ?? '1'

  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver,
  })

  const { errors } = formState

  const onSubmit = (data) => {
    setIsPending(true)
    firebaseResetPassword(data.email)
      .then((data) => {
        if (data.error) {
          throw new Error('This email is not registered')
        }
        setIsPending(false)
        setIsSuccess(true)
      })
      .catch((error) => {
        setIsPending(false)
        setErrorFromServer(error.message)
      })
  }

  const goToStep = (step) => {
    router.push(`${router.pathname}?step=${step}`)
  }

  const renderComponent = () => {
    if (step === '1') return <ResetSendEmail />
    if (step === '2') return <ResetNewPassword />

    router.push('/')
  }

  return (
    <ResetPasswordLayout goToStep={goToStep}>
      {renderComponent()}
    </ResetPasswordLayout>
  )
}

export default ResetPasswordMain
