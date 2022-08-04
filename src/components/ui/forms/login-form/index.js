import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated, login } from '@/redux/slices/auth'
import NextLink from 'next/link'
import { EyeIcon, EyeOffIcon, MenuIcon } from '@heroicons/react/outline'
import { Logo } from '@/components/common/svgs'
import { GoogleIcon } from '@/components/common/icons'
import authSelector from '@/redux/selectors/auth'

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
    <div className="flex min-h-[calc(100vh-56px)]">
      <div className="flex-[2] flex flex-col">
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-sm p-4 mx-auto ">
            <NextLink href="/">
              <a className="inline-block mb-20 text-white md:text-black">
                <Logo />
              </a>
            </NextLink>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Log in</h2>
              <p className="mt-2 text-sm text-gray-500">
                Welcome back! Please enter your details.
              </p>
            </div>
            <div className="mt-8">
              <div className="mb-6">
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
                    <div>
                      <input
                        type="checkbox"
                        className="rounded-[4px] border border-gray-300"
                        id="login-remember"
                      />
                      <label
                        htmlFor="login-remember"
                        className="ml-1 text-sm cursor-pointer"
                      >
                        Remember for 30 days
                      </label>
                    </div>

                    <div className="text-sm">
                      <NextLink href="/forgot-password">
                        <a className="font-medium text-blue-700">
                          Forgot password
                        </a>
                      </NextLink>
                    </div>
                  </div>

                  <div>
                    <button className="w-full btn-primary" type="submit">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <button
                  className="w-full text-gray-700 bg-white border border-gray-300 btn-primary hover:bg-gray-100"
                  onClick={() => handleFirebaseAuthWithProvider('GOOGLE')}
                >
                  <GoogleIcon className="w-6 h-6" />
                  <span className="ml-3">Sign in with Google</span>
                </button>
              </div>

              <p className="mt-6 text-sm text-center">
                Don’t have an account?{' '}
                <NextLink href="/register">
                  <a className="font-semibold text-blue-700">Sign up </a>
                </NextLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex px-8 pt-14 lg:items-end lg:justify-center relative w-0 flex-[3] ">
        {/* image wrapper for now */}
        <div className="inline-block w-full h-full max-w-2xl rounded-3xl bg-slate-200"></div>
      </div>
    </div>
  )
}

export default LoginForm
