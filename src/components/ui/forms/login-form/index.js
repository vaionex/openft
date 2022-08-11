import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated, login } from '@/redux/slices/auth'
import NextLink from 'next/link'
import { EyeIcon, EyeOffIcon, MenuIcon } from '@heroicons/react/outline'

import authSelector from '@/redux/selectors/auth'
import Checkbox from '../../checkbox'

function LoginForm() {
  const dispatch = useDispatch()
  const router = useRouter()

  // Auth State from Redux
  const authState = useSelector(authSelector)

  const [passwordVisible, setPasswordVisible] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {}

  const handleSubmit = (e) => {}

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full p-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Enter email address"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative flex mt-1">
          <input
            id="password"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className="block w-full p-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            onChange={handleChange}
            placeholder="Enter password"
          />
          <span
            className="absolute cursor-pointer right-3 top-3"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <EyeOffIcon className="w-6 h-6 text-gray-400" />
            ) : (
              <EyeIcon className="w-6 h-6 text-gray-400" />
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Checkbox id="remember-me" text="Remember for 30 days" />

        <div className="text-sm">
          <NextLink href="/forgot-password">
            <a className="font-medium text-blue-700">Forgot password</a>
          </NextLink>
        </div>
      </div>

      <div>
        <button className="w-full btn-primary" type="submit">
          Sign in
        </button>
      </div>
    </form>
  )
}

export default LoginForm
