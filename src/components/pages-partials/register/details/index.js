import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import registrationFormSelector from '@/redux/selectors/registration-form'
import { setDetailsValues } from '@/redux/slices/registration-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { InputMain } from '@/components/ui/inputs'
import { UserCircleIcon } from '@/components/common/icons'

import validationSchema from './validationScheme'

const inputAttributes = [
  {
    type: 'text',
    placeholder: 'e.g. John Smith',
    name: 'name',
    title: 'Name',
    required: true,
  },
  {
    type: 'text',
    placeholder: 'e.g. johnsmith',
    name: 'username',
    title: 'Username',
    required: true,
  },
  {
    type: 'text',
    placeholder: 'e.g. johnsmith@openft.com',
    name: 'email',
    title: 'Email',
    required: true,
  },
  {
    type: 'text',
    placeholder: 'e.g. Illustrator',
    name: 'role',
    title: 'Role',
    required: true,
  },
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
        <h2 className="mt-6 text-3xl font-semibold text-center text-gray-900">
          Your details
        </h2>
        <p className="mt-3 text-center font-normal text-base text-gray-500">
          Will be displayed on your profile and <br /> visible to the public
        </p>
      </div>
      <div className="w-full mt-2 sm:mx-auto md:max-w-md">
        <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {inputAttributes.map((inputAttribute) => (
              <InputMain
                key={inputAttribute.name}
                className="relative pb-0 border-none sm:gap-1"
              >
                <InputMain.Label
                  htmlFor={inputAttribute.name}
                  className="text-sm font-medium text-gray-700 "
                  label={inputAttribute.title}
                  required={inputAttribute.required}
                />
                <Controller
                  name={inputAttribute.name}
                  control={control}
                  render={({ field }) => {
                    return (
                      <InputMain.Input
                        id={inputAttribute.name}
                        placeholder={inputAttribute.placeholder}
                        className="mb-0"
                        type={inputAttribute.type}
                        onInput={(e) => {
                          console.log(e.target.name)
                          const removeWhiteSpace = ['username', 'email']
                          if (removeWhiteSpace.includes(e.target.name)) {
                            e.target.value = e.target.value.replace(/\s/g, '')
                          }
                        }}
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
