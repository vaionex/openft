import { EmailSentIcon } from '@/components/common/icons'
import ButtonWLoading from '@/components/ui/button-w-loading'
import { InputMain } from '@/components/ui/inputs'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import NextLink from 'next/link'
import { KeyIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'
import { firebaseAuth } from '@/firebase/init'
import { useRouter } from 'next/router'

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*?[A-Z])/, 'Password need upper case letter')
    .matches(/(?=.*?[a-z])/, 'Password need lower case letter')
    .matches(/(?=.*?[0-9])/, 'Password need number'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const ResetNewPassword = () => {
  const router = useRouter()
  const [resetFormActive, setResetFormActive] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const [msg, setMsg] = useState({
    type: '',
    content: '',
  })
  const code = router.query.oobCode
  const apiKey = router.query.apiKey

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
    const { password } = data
    confirmPasswordReset(firebaseAuth, code, password)
      .then((resp) => {
        setIsPending(false)
        setResetFormActive(false)
      })
      .catch((error) => {
        setMsg({
          type: 'error',
          content:
            'Error occurred during confirmation. The code might have expired or the password is too weak.',
        })
        setIsPending(false)
      })
  }

  useEffect(() => {
    if (apiKey && code) {
      verifyPasswordResetCode(firebaseAuth, code)
        .then((email) => {})
        .catch((error) => {
          setMsg({
            type: 'error',
            content:
              'Invalid or expired action code. Try to reset your password again.',
          })
        })
    } else {
      // router.replace('/')
    }
  }, [])

  return (
    <>
      {!resetFormActive ? (
        <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <EmailSentIcon className="w-auto mx-auto rounded-full h-14" />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Password updated
            </h2>
            <p className="mt-4 text-center">
              Your password has been changed successfully. Use your new password
              to
              <NextLink href="/login">
                <a className="text-blue-500"> login </a>
              </NextLink>
            </p>
          </div>
        </div>
      ) : apiKey && code ? (
        <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <KeyIcon className="w-auto p-3 mx-auto text-blue-600 rounded-full bg-blue-50 h-14" />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              New password
            </h2>
            <p className="mt-4 text-center">
              Your new password must be more than 8 characters and should
              contain an alfa numeric, atleast one upper case character.
            </p>
          </div>
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <InputMain className="relative border-none sm:grid-cols-1 sm:gap-2">
                  <InputMain.Label
                    label="Your new password"
                    htmlFor="password"
                  />
                  <Controller
                    name={'password'}
                    control={control}
                    render={({ field }) => {
                      return (
                        <InputMain.Input
                          inputType={'password'}
                          id="password"
                          className="sm:col-span-2"
                          placeholder="Enter your new password"
                          error={errors.password?.message}
                          {...field}
                        />
                      )
                    }}
                  />
                </InputMain>

                <InputMain className="relative border-none sm:grid-cols-1 sm:gap-2">
                  <InputMain.Label
                    label="Confirm new password"
                    htmlFor="confirmPassword"
                  />
                  <Controller
                    name={'confirmPassword'}
                    control={control}
                    render={({ field }) => {
                      return (
                        <InputMain.Input
                          id="confirmPassword"
                          inputType={'password'}
                          className="sm:col-span-2"
                          placeholder="Confirm new password"
                          error={errors.confirmPassword?.message}
                          {...field}
                        />
                      )
                    }}
                  />
                </InputMain>

                <div className="flex flex-col gap-4">
                  {msg.type === 'error' && (
                    <span className="text-xs text-red-500">{msg.content}</span>
                  )}
                  {msg.type === 'success' && (
                    <span className="text-xs text-green-500">
                      {msg.content}
                    </span>
                  )}
                  <ButtonWLoading
                    isPending={isPending}
                    text="Reset Password"
                    type="submit"
                    fullWidth
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
          <div className="flex justify-center space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  )
}

export default ResetNewPassword
