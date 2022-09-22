import { useState } from 'react'
import { InputMain } from '@/components/ui/inputs'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useForm, Controller } from 'react-hook-form'
import validationSchema from './validationScheme'
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getAuth,
} from 'firebase/auth'
import Alert from '@/components/ui/alert'
import Spinner from '@/components/ui/spinner'

const SecurityForm = () => {
  const [msg, setMsg] = useState(null)
  const [buttonStatus, setButtonStatus] = useState(false)
  const auth = getAuth()
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset, getValues } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver,
  })
  const { isSubmitting, isValid, errors } = formState
  const onSubmit = async (data) => {
    const { password, newPassword } = data
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password,
    )

    await reauthenticateWithCredential(auth.currentUser, credential)
      .then(async () => {
        await updatePassword(auth.currentUser, newPassword)
          .then(() => {
            reset({ password: '', newPassword: '', confirmPassword: '' })
            setMsg({ type: 'success', content: 'Password updated' })
          })
          .catch((error) => {
            setMsg({ type: 'error', content: 'Something went wrong' })
            console.log(error)
          })
      })
      .catch((err) =>
        setMsg({
          type: 'error',
          content: 'Please enter your previous password correctly',
        }),
      )
  }

  const changeHandler = () => {
    const newPassword = getValues('newPassword')
    const confirmPassword = getValues('confirmPassword')
    const passRegx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/
    const regex = new RegExp(passRegx)
    if (
      regex.test(newPassword) &&
      regex.test(confirmPassword) &&
      newPassword === confirmPassword
    ) {
      setButtonStatus(true)
    } else {
      setButtonStatus(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="py-6 border-b border-b-gray-200">
        <InputMain className="border-none relative sm:grid-cols-1 sm:gap-2">
          <InputMain.Label label="Your password" htmlFor="password" />
          <Controller
            name={'password'}
            control={control}
            render={({ field }) => {
              return (
                <InputMain.Input
                  inputType={'password'}
                  id="password"
                  className="sm:col-span-2"
                  placeholder="Enter your current password"
                  {...field}
                />
              )
            }}
          />
          <span className="absolute text-xs text-red-600 -bottom-1 left-2">
            {errors['password']?.message}
          </span>
        </InputMain>
        <InputMain className="border-none relative sm:grid-cols-1 sm:gap-2">
          <InputMain.Label label="New password" htmlFor="newPassword" />
          <Controller
            name={'newPassword'}
            control={control}
            render={({ field }) => {
              return (
                <InputMain.Input
                  id="newPassword"
                  inputType={'password'}
                  className="sm:col-span-2"
                  placeholder="Enter new password"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    changeHandler()
                  }}
                />
              )
            }}
          />
          <span className="absolute text-xs text-red-600 -bottom-1 left-2">
            {errors['newPassword']?.message}
          </span>
          <span className="text-sm text-gray-500">
            Your new password must be more than 6 characters.
          </span>
        </InputMain>

        <InputMain className="border-none relative sm:grid-cols-1 sm:gap-2">
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
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    changeHandler()
                  }}
                />
              )
            }}
          />
          <span className="absolute text-xs text-red-600 -bottom-1 left-2">
            {errors['confirmPassword']?.message}
          </span>
        </InputMain>

        <InputMain className="border-none sm:grid-cols-1 sm:gap-2">
          <InputMain.Label label="Mnemonic" htmlFor="mnemonic" />
          <textarea
            className="w-full text-gray-500 border border-gray-300 rounded-md shadow-sm resize-none disabled:bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={3}
            id="mnemonic"
            defaultValue={
              'gravity stable govern write bacon labor slide gauge meat broom swarm tomato'
            }
            disabled
            placeholder=""
          />
          <span className="text-sm text-gray-500">
            The mnemonic can help restore the wallet and reset the wallet&apos;s
            authorization password. Please write it down on paper and store it
            in a safe place.
          </span>
        </InputMain>
        {msg && <Alert message={msg.content} type={msg.type} />}
      </div>
      <div className="flex justify-end gap-3 border-none">
        <button
          onClick={() => {
            reset({ password: '', newPassword: '', confirmPassword: '' })
            setMsg(null)
          }}
          type="button"
          className="btn-secondary py-2.5"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={buttonStatus ? false : true}
          className={`py-2.5 font-semibold relative ${
            isSubmitting ? 'btn-secondary pr-10' : 'btn-primary'
          }`}
        >
          Update password
          {isSubmitting && <Spinner size="w-5 h-5 absolute top-3 right-1" />}
        </button>
      </div>
    </form>
  )
}

export default SecurityForm
