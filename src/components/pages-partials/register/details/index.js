import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Alert from '@/components/ui/alert'
import RegistrationLayout from '@/components/layout/registration-layout'
import authSelector from '@/redux/selectors/auth'
import { useForm, Controller } from 'react-hook-form'
import registrationFormSelector from '@/redux/selectors/registration-form'
import * as yup from 'yup'
import {
  setCurrentStep,
  setDetailsValues,
} from '@/redux/slices/registration-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { InputMain } from '@/components/ui/inputs'
import { UserCircleIcon } from '@/components/common/icons'

const inputAttributes = [
  { type: 'text', placeholder: 'Name', name: 'name' },
  { type: 'text', placeholder: 'Username', name: 'username' },
  { type: 'text', placeholder: 'Email', name: 'email' },
  { type: 'text', placeholder: 'Role, e.g. Illustrator', name: 'role' },
]

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
})

function RegistrationDetails() {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  const { detailsValues } = useSelector(registrationFormSelector)

  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: detailsValues,
    resolver,
  })

  const { isSubmitting, isValid, errors } = formState

  const onSubmit = (data) => {
    dispatch(setCurrentStep(2))
    dispatch(setDetailsValues(data))
    router.push('/register/choose-password')
  }

  return (
    <RegistrationLayout>
      <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <UserCircleIcon className="w-auto mx-auto rounded-full h-14" />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Your details
          </h2>
          <p className="mt-4 text-center">
            Will be displayed on your profile and <br /> visible to the public
          </p>
        </div>
        <div className="flex justify-center pt-2">
          {auth.errorMessage && (
            <Alert message={auth.errorMessage} type="error" />
          )}
        </div>
        <div className="w-full mt-2 sm:mx-auto md:max-w-md">
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
              <button
                disabled={isSubmitting || !isValid}
                type="submit"
                className="w-full font-semibold btn-primary"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </RegistrationLayout>
  )
}

export default RegistrationDetails
