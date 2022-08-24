import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import registrationFormSelector from '@/redux/selectors/registration-form'
import { setDetailsValues } from '@/redux/slices/registration-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { InputMain } from '@/components/ui/inputs'
import { UserCircleIcon } from '@/components/common/icons'

import validationSchema from './validationScheme'

const inputAttributes = [
  { type: 'text', placeholder: 'Name', name: 'name' },
  { type: 'text', placeholder: 'Username', name: 'username' },
  { type: 'text', placeholder: 'Email', name: 'email' },
  { type: 'text', placeholder: 'Role, e.g. Illustrator', name: 'role' },
]

function RegistrationDetails({ goToStep }) {
  const dispatch = useDispatch()
  const { detailsValues } = useSelector(registrationFormSelector)

  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: detailsValues,
    resolver,
  })

  const { errors } = formState

  const onSubmit = (data) => {
    dispatch(setDetailsValues(data))
    goToStep(2)
  }

  return (
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
                  render={({ field }) => {
                    return (
                      <InputMain.Input
                        id={inputAttribute.name}
                        placeholder={inputAttribute.placeholder}
                        className="mb-8 sm:mb-4"
                        type={inputAttribute.type}
                        {...field}
                      />
                    )
                  }}
                />
                <span className="absolute text-xs text-red-600 -bottom-6 sm:-bottom-2 left-2">
                  {errors[inputAttribute.name]?.message}
                </span>
              </InputMain>
            ))}

            <button type="submit" className="w-full font-semibold btn-primary">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationDetails
