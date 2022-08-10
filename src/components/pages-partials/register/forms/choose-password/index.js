/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { FormInput } from '@/components/ui/inputs'
import Alert from '@/components/ui/alert'
import { setUserData, setAuthenticated, register } from '@/redux/slices/auth'
import { KeyIcon } from '@heroicons/react/outline'
import Steps from '../../steps/stepsContainer'

const inputAttributes = [
  {
    type: 'password',
    placeholder: 'Choose a password',
    name: 'choose-password',
    label: 'Choose a password',
  },
  {
    type: 'password',
    placeholder: 'Confirm password',
    name: 'confirm-password',
    label: 'Confirm password',
  },
]

function ChoosePassword() {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    password: '',
    'confim-password': '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <div className="flex flex-col h-full px-4 py-12 sm:px-6 lg:px-8">
      <Steps stepsType={'box'} />
      <div className="flex flex-col justify-center flex-1 item-center">
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              {inputAttributes.map((inputAttribute) => (
                <FormInput
                  key={inputAttribute.name}
                  visibility={false}
                  {...inputAttribute}
                  value={formData[inputAttribute.name]}
                  onChange={handleChange}
                />
              ))}

              <div>
                <button
                  disabled={auth.isPending ? true : false}
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    auth.isPending
                      ? 'bg-gray-100'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } transition ease-in-out delay-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end pt-10 sm:pt-0">
        <Steps stepsType={'line'} />
      </div>
    </div>
  )
}

export default ChoosePassword
