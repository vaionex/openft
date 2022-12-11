import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { InputMain } from '@/components/ui/inputs'
import Alert from '@/components/ui/alert'
import { KeyIcon } from '@heroicons/react/outline'
import { Controller, useForm } from 'react-hook-form'
import registrationFormSelector from '@/redux/selectors/registration-form'
import * as yup from 'yup'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { setPasswordValues } from '@/redux/slices/registration-form'

const inputAttributes = [
  {
    type: 'password',
    placeholder: 'Choose a password',
    name: 'password',
    title: 'Password',
    required: true,
  },
  {
    type: 'password',
    placeholder: 'Confirm your password',
    name: 'confirmPassword',
    title: 'Confirm Password',
    required: true,
  },
]

const validationSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

function RegistrationChoosePassword({ goToStep }) {
  const dispatch = useDispatch()
  const { passwordValues } = useSelector(registrationFormSelector)

  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
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
        <h2 className="mt-6 text-3xl font-semibold text-center text-gray-900">
          Choose a password
        </h2>
        <p className="mt-3 text-center text-base font-normal text-gray-500">
          Your password must be more than 8 characters and should contain an
          alfa numeric, atleast one upper case character.
        </p>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {inputAttributes.map((inputAttribute) => (
              <InputMain
                key={inputAttribute.name}
                className="relative pb-0 border-none sm:gap-1"
              >
                <InputMain.Label
                  htmlFor={inputAttribute.name}
                  className="text-sm font-medium text-gray-700"
                  label={inputAttribute.title}
                  required={inputAttribute.required}
                />
                <Controller
                  name={inputAttribute.name}
                  control={control}
                  render={({ field }) => (
                    <InputMain.Input
                      id={inputAttribute.name}
                      placeholder={inputAttribute.placeholder}
                      className="mb-0"
                      type={inputAttribute.type}
                      {...field}
                    />
                  )}
                />
                <span className="absolute text-xs text-red-600 -bottom-5 sm:-bottom-[18px] left-2">
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
                // disabled={isSubmitting || !isValid}
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
