import { EmailSentIcon, UsersCircleIcon } from '@/components/common/icons'
import ResetPasswordLayout from '@/components/layout/reset-password'
import ButtonWLoading from '@/components/ui/button-w-loading'
import { InputMain } from '@/components/ui/inputs'
import { firebaseResetPassword } from '@/firebase/utils'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import NextLink from 'next/link'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, 'Email is not valid')
    .required('Email is required'),
})

const ResetPasswordMain = () => {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorFromServer, setErrorFromServer] = useState('')

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

  return (
    <ResetPasswordLayout>
      {isSuccess ? (
        <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <EmailSentIcon className="w-auto mx-auto rounded-full h-14" />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Magic link sent
            </h2>
            <p className="mt-4 text-center">
              Please click the link in your email to reset your password and try
              to
              <NextLink href="/login">
                <a className="text-blue-500"> login </a>
              </NextLink>
              again. If you don&apos;t see the email, please check your spam
              folder.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <UsersCircleIcon className="w-auto mx-auto rounded-full h-14" />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Reset your password
            </h2>
            <p className="mt-4 text-center">
              Please enter your email address and we&apos;ll send you a magic
              link to reset your password.
            </p>
          </div>
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <InputMain className="relative pb-0 border-none">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <InputMain.Input
                        id="email"
                        placeholder="Email"
                        className="mb-8 sm:mb-4"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/\s/g, '')
                        }}
                        {...field}
                        error={errors.email?.message || errorFromServer}
                      />
                    )}
                  />
                </InputMain>

                <div className="flex gap-4">
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
      )}
    </ResetPasswordLayout>
  )
}

export default ResetPasswordMain
