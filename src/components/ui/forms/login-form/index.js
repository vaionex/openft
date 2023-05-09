import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated, login } from '@/redux/slices/user'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import NextLink from 'next/link'
import Checkbox from '../../checkbox'
import Alert from '../../alert'
import userSelector from '@/redux/selectors/user'
import ButtonWLoading from '../../button-w-loading'
import { firebaseLogin, verifyWithSelectedMfa } from '@/firebase/utils'
import OtpModal from '@/components/ui/otp'
import MfaSelection from '../../otp/MfaSelection'

function LoginForm({ setVerifyID, verifyID }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isPending } = useSelector(userSelector)
  const [isOpen, setIsOpen] = useState(false)
  const [isTotp, setIsTotp] = useState(false)
  const [allowedCharacters, setAllowedCharacters] = useState('numeric')
  const [otpNumber, setOtpNumber] = useState('')
  const handleOnChange = (enteredOtp) => {
    setOtpNumber(enteredOtp)
  }
  const [selectedFactor, setSelectedFactor] = useState()
  const [factors, setFactors] = useState(false)
  const [uid, setUid] = useState(null)
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
    try {
      const user = await dispatch(
        login({
          verificationId: verifyID,
          verificationCode: otpNumber,
          uid
        }),
      ).unwrap()
      if (user && !user?.error) {
        dispatch(setAuthenticated(true))
        router.replace('/')
      }
    } catch (err) {
      if (err.code == 'auth/invalid-verification-code') {
        setError('Invalid verification code')
      } else if (err.code == 'auth/code-expired') {
        setError('Code expired')
      } else {
        console.log('error', e)
        setError(err)
      }
    }
  }
  const handleSubmitMfaType = (e) => {
    verifyWithSelectedMfa(e, setVerifyID, setUid)
  }
  const handleSubmit = async (e, option) => {
    e.preventDefault()
    try {
      await firebaseLogin({
        ...formData,
        rememberMe,
        setVerifyID,
        setError,
        setUid,
        setFactors,

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
  useEffect(() => {
    if (uid) {
      setIsOpen(true)
      setIsTotp(true)
    }
  }, [uid])
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
                <EyeIcon className="w-6 h-6 text-gray-400" />
              ) : (
                <EyeOffIcon className="w-6 h-6 text-gray-400" />
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
        isTotp={isTotp}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleOnChange={handleOnChange}
        handler={handleLogin}
        allowedCharacters={allowedCharacters}
        otpNumber={otpNumber}
      />
      <MfaSelection
        setSelectedFactor={setSelectedFactor}
        isOpen={factors}
        setIsOpen={setFactors}
        handler={handleSubmitMfaType}
      />
    </div>
  )
}

export default LoginForm
