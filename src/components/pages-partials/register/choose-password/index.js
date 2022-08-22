import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { InputMain } from '@/components/ui/inputs'
import Alert from '@/components/ui/alert'
import { KeyIcon } from '@heroicons/react/outline'
import { Controller, useForm } from 'react-hook-form'
import registrationFormSelector from '@/redux/selectors/registration-form'
import * as yup from 'yup'
import authSelector from '@/redux/selectors/auth'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { setPasswordValues } from '@/redux/slices/registration-form'

const inputAttributes = [
  {
    type: 'password',
    placeholder: 'Choose a password',
    name: 'password',
  },
  {
    type: 'password',
    placeholder: 'Confirm password',
    name: 'confirmPassword',
  },
]

const validationSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

function RegistrationChoosePassword({ goToStep }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  const { passwordValues } = useSelector(registrationFormSelector)

  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: passwordValues,
    resolver,
  })

  const { isSubmitting, isValid, errors } = formState

  const onSubmit = (data) => {
    dispatch(setPasswordValues(data))
    goToStep(3)
  }

  return (
    <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <KeyIcon className="w-auto rounded-full mx-auto p-3 bg-blue-50 text-blue-600 h-14 stroke-[1.5]" />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Choose a password
        </h2>
        <p className="mt-4 text-center">Must be at least 8 characters.</p>
      </div>
      <div className="flex justify-center pt-2">
        {auth.errorMessage && (
          <Alert message={auth.errorMessage} type="error" />
        )}
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                      placeholder={inputAttribute.placeholder}
                      className="mb-8 sm:mb-4"
                      type={inputAttribute.type}
                      {...field}
                    />
                  )}
                />
                <span className="absolute text-xs text-red-600 -bottom-6 sm:-bottom-2 left-2">
                  {errors[inputAttribute.name]?.message}
                </span>
              </InputMain>
            ))}

            <div className="flex gap-4">
              <button
                type="button"
                className="w-full font-semibold btn-secondary"
                onClick={(e) => goToStep(1)}
              >
                Back
              </button>
              <button
                disabled={isSubmitting || !isValid}
                type="submit"
                className="w-full font-semibold btn-primary"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationChoosePassword
