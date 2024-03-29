import { useState } from 'react'
import NextLink from 'next/link'
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
import ButtonWLoading from '@/components/ui/button-w-loading'
import { useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import Spinner from '@/components/ui/spinner'

const SecurityForm = () => {
  const { mnemonic } = useSelector(walletSelector)
  const [buttonStatus, setButtonStatus] = useState(false)
  const [msg, setMsg] = useState({
    type: '',
    content: '',
  })
  const auth = getAuth()
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset, getValues } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver,
  })
  const { isSubmitting, isValid, errors } = formState

  const changeHandler = () => {
    const newPassword = getValues('newPassword')
    const confirmPassword = getValues('confirmPassword')
    // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const passRegx = /^(?=.*?[A-Z])(?=.*?[a-z]).{5,}$/
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

  const onSubmit = async (data) => {
    const { password, newPassword } = data
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password,
    )

    await reauthenticateWithCredential(auth.currentUser, credential)
      .then(async () => {
        if (newPassword !== password) {
          await updatePassword(auth.currentUser, newPassword)
            .then(() => {
              reset({ password: '', newPassword: '', confirmPassword: '' })
              setMsg({ type: 'success', content: 'Password updated' })
              setButtonStatus(false)
            })
            .catch((error) => {
              setMsg({ type: 'error', content: 'Something went wrong' })
              console.log(error)
            })
        } else {
          setMsg({
            type: 'error',
            content: 'New password cannot be the same as your old password.',
          })
        }
      })
      .catch((err) =>
        setMsg({
          type: 'error',
          content: 'Current password is incorrect',
        }),
      )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
      <div className="py-6 border-b border-b-gray-200">
        <InputMain className="relative border-none sm:grid-cols-1 sm:gap-2">
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
                  inputClassName="md:h-11"
                  placeholder="Enter your current password"
                  error={errors.password?.message}
                  {...field}
                />
              )
            }}
          />
        </InputMain>
        <InputMain className="relative border-none sm:grid-cols-1 sm:gap-2">
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
                  inputClassName="md:h-11"
                  placeholder="Enter new password"
                  error={errors.newPassword?.message}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    changeHandler()
                  }}
                />
              )
            }}
          />
          <span className="text-sm text-gray-500">
            Your password must be minimum five characters also must contain one
            uppercase and one lowercase letter.
          </span>
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
                  inputClassName="md:h-11"
                  placeholder="Confirm new password"
                  error={errors.confirmPassword?.message}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    changeHandler()
                  }}
                />
              )
            }}
          />
        </InputMain>

        <InputMain className="border-none sm:grid-cols-1 sm:gap-2">
          <InputMain.Label label="Mnemonic" htmlFor="mnemonic" />
          <textarea
            className="w-full text-mist border border-gray-300 rounded-md shadow-sm resize-none disabled:bg-vista-white focus:ring-blue-500 focus:border-blue-500 sm:text-base"
            rows={2}
            id="mnemonic"
            defaultValue={mnemonic || ''}
            disabled
            placeholder=""
          />
          <span className="text-sm text-gray-500">
            The mnemonic can help restore the wallet and reset the wallet&apos;s
            authorization password. Please write it down on paper and store it
            in a safe place.
          </span>
        </InputMain>
      </div>

      {msg.type === 'error' && (
        <span className="text-xs text-red-500">{msg.content}</span>
      )}
      {msg.type === 'success' && (
        <span className="text-xs text-green-500">{msg.content}</span>
      )}

      <div className="flex justify-end gap-3 border-none">
        <NextLink href={'/'}>
          <a className="btn-secondary py-2.5">Cancel</a>
        </NextLink>
        <ButtonWLoading
          isPending={isSubmitting}
          disabled={buttonStatus ? false : true}
          text="Update password"
          type="submit"
        />
      </div>
    </form>
  )
}

export default SecurityForm
