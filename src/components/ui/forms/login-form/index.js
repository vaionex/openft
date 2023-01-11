import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated, login } from '@/redux/slices/user'
import { EyeIcon, EyeOffIcon, MenuIcon } from '@heroicons/react/outline'
import NextLink from 'next/link'
import Checkbox from '../../checkbox'
import Alert from '../../alert'
import userSelector from '@/redux/selectors/user'
import ButtonWLoading from '../../button-w-loading'
import { firebaseLogin } from '@/firebase/utils'
import OtpModal from './otp'

function LoginForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isPending } = useSelector(userSelector)
  const [isOpen, setIsOpen] = useState(false)
  const [verifyID, setVerifyID] = useState(null)
  const [verifyCode, setVerifyCode] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (error) setError(null)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const otpNumber = Object.values(verifyCode).join('')
    try {
      const user = await dispatch(
        login({
          verificationId: verifyID,
          verificationCode: otpNumber,
        }),
      ).unwrap()
      if (user && !user?.error) {
        dispatch(setAuthenticated(true))
        router.replace('/')
      }
    } catch (e) {
      console.log('error', e)
      setError(e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await firebaseLogin({
        ...formData,
        rememberMe,
        setVerifyID,
        setError,
      })
    } catch (e) {
      console.log('login error', e)
      //setError(e)
    }
  }

  useEffect(() => {
    if (verifyID) {
      setIsOpen(true)
    }
  }, [verifyID])

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error ? (
          <div className="flex justify-center pt-2">
            {error && <Alert message={error} type="error" />}
          </div>
        ) : (
          ''
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full p-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              onChange={handleChange}
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
          <Checkbox
            id="remember-me"
            text="Remember for 30 days"
            checked={true}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <div className="text-sm">
            <NextLink href="/reset-password">
              <a className="font-medium text-blue-700">Forgot password</a>
            </NextLink>
          </div>
        </div>

        <div>
          <ButtonWLoading
            isError={error}
            isPending={isPending}
            text="Sign In"
            type="submit"
            fullWidth
          />
        </div>
      </form>
      <OtpModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handler={handleLogin}
        verifyCode={verifyCode}
        setVerifyCode={setVerifyCode}
      />
    </div>
  )
}

export default LoginForm
