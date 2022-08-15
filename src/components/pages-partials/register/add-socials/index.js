/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { InputMain } from '@/components/ui/inputs'
import Alert from '@/components/ui/alert'
import { setUserData, setAuthenticated, register } from '@/redux/slices/auth'
import { UsersIcon } from '@/components/common/icons'
import RegistrationLayout from '@/components/layout/registration-layout'

const inputAttributes = [
  {
    type: 'text',
    addOn: 'http://instagram.com/',
    placeholder: 'name',
    name: 'instagram',
    label: 'Instagram',
  },
  {
    type: 'text',
    addOn: 'http://facebook.com/',
    placeholder: 'name',
    name: 'facebook',
    label: 'Facebook',
  },
  {
    type: 'text',
    addOn: 'http://',
    placeholder: 'yourwebsite.com',
    name: 'website',
    label: 'Website',
  },
]

function RegistrationAddSocials() {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    password: '',
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
    <RegistrationLayout>
      <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <UsersIcon className="w-auto mx-auto rounded-full h-14" />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Add your socials
          </h2>
          <p className="mt-4 text-center">
            You are welcome to link to your own webpage <br /> with more
            details.
          </p>
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
                <InputMain key={inputAttribute.name}>
                  <InputMain.Input
                    variant="add-on"
                    addon={inputAttribute.addOn}
                    className="sm:col-span-2"
                    value={formData[inputAttribute.name]}
                    {...inputAttribute}
                  />
                </InputMain>
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
                  Finish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </RegistrationLayout>
  )
}

export default RegistrationAddSocials
