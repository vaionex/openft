/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from 'react-redux'
import { InputMain } from '@/components/ui/inputs'
import { UsersCircleIcon } from '@/components/common/icons'
import { Controller, useForm } from 'react-hook-form'
import registrationFormSelector from '@/redux/selectors/registration-form'
import { setSocialsValues } from '@/redux/slices/registration-form'
import userSelector from '@/redux/selectors/user'
import ButtonWLoading from '@/components/ui/button-w-loading'

const inputAttributes = [
  {
    id: 'instagram',
    type: 'text',
    addon: 'http://instagram.com/',
    placeholder: 'username',
    name: 'instagram',
  },
  {
    id: 'facebook',
    type: 'text',
    addon: 'http://facebook.com/',
    placeholder: 'username',
    name: 'facebook',
  },
  {
    id: 'website',
    type: 'text',
    addon: 'http://',
    placeholder: 'yourwebsite.com',
    name: 'website',
  },
]

function RegistrationAddSocials({ goToStep }) {
  const dispatch = useDispatch()
  const { isPending, isError } = useSelector(userSelector)
  const { socialsValues } = useSelector(registrationFormSelector)
  const { control, handleSubmit } = useForm({
    defaultValues: socialsValues,
  })

  const onSubmit = async (data) => {
    console.log(data)
    dispatch(setSocialsValues(data))
  }

  return (
    <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <UsersCircleIcon className="w-auto mx-auto rounded-full h-14" />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Add your socials
        </h2>
        <p className="mt-4 text-center">
          You are welcome to link to your own webpage <br /> with more details.
        </p>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
          <form className="space-y-6">
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
                      variant="add-on"
                      addon={inputAttribute.addon}
                      placeholder={inputAttribute.placeholder}
                      className="mb-8 sm:mb-4"
                      type={inputAttribute.type}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\s/g, '')
                      }}
                      {...field}
                    />
                  )}
                />
              </InputMain>
            ))}

            <div className="flex gap-4">
              <button
                type="button"
                className="w-full font-semibold btn-secondary"
                onClick={() => goToStep(3)}
              >
                Back
              </button>
              <ButtonWLoading
                isError={isError}
                isPending={isPending}
                text="Finish"
                onClick={handleSubmit(onSubmit)}
                fullWidth
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationAddSocials
