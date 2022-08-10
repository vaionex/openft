/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { AddOnInput } from '@/components/ui/forms'
import Alert from '@/components/ui/alert'
import { setUserData, setAuthenticated, register } from '@/redux/slices/auth'
import { UsersIcon } from '@/components/common/icons'
import Steps from '../../steps/stepsContainer'

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

function AddSocials() {
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
    <div className="h-full py-12 sm:px-6 lg:px-8 flex flex-col">
      <Steps stepsType={'box'} />
      <div className="flex-1 flex flex-col justify-center item-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <UsersIcon className="w-auto rounded-full mx-auto h-14" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add your socials
          </h2>
          <p className="text-center mt-4">
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
          <div className="bg-white py-2 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {inputAttributes.map((inputAttribute) => (
                <AddOnInput
                  key={inputAttribute.name}
                  {...inputAttribute}
                  addOn={inputAttribute.addOn}
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
                  Finish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <Steps stepsType={'line'} />
      </div>
    </div>
  )
}

export default AddSocials
