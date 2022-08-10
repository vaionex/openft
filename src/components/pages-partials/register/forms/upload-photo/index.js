/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { FormInput, InputMain } from '@/components/ui/inputs'
import Alert from '@/components/ui/alert'
import { setUserData, setAuthenticated, register } from '@/redux/slices/auth'
import { CameraIcon } from '@heroicons/react/outline'
import Steps from '../../steps/stepsContainer'
import ImageUpload from '@/components/ui/forms/settings-parts/image-upload'

function UploadPhoto() {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await dispatch(register(formData)).unwrap()
    if (user && !user?.error) {
      dispatch(setAuthenticated())
      router.replace('/')
    }
  }

  return (
    <div className="flex flex-col h-full py-12 sm:px-6 lg:px-8">
      <Steps stepsType={'box'} />
      <div className="flex flex-col justify-center flex-1 item-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <CameraIcon className="w-auto rounded-full mx-auto p-3 bg-blue-50 text-blue-600 h-14 stroke-[1.5]" />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Upload your photo
          </h2>
          <p className="mt-4 text-center">
            Beautify your profile, it also will
            <br /> be visible to the public
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
              <ImageUpload text="Cover Photo" subinfo="Max. size 4MB" />

              <ImageUpload text="Cover Photo" subinfo="Max 400x400" />
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
      <div className="flex flex-col justify-end">
        <Steps stepsType={'line'} />
      </div>
    </div>
  )
}

export default UploadPhoto
