import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated, login } from '@/redux/slices/user'
import { EyeIcon, EyeOffIcon, MenuIcon } from '@heroicons/react/outline'
import NextLink from 'next/link'
import Checkbox from '../../checkbox'
import Alert from '../../alert'
import userSelector from '@/redux/selectors/user'
import ButtonWLoading from '../../button-w-loading'

function LoginForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isPending } = useSelector(userSelector)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await dispatch(login({ ...formData, rememberMe })).unwrap()
      if (user && !user?.error) {
        dispatch(setAuthenticated(true))
        router.replace('/')
      }
    } catch (e) {
      console.log('error', e)
      setError(e)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex justify-center pt-2">
        {error && <Alert message={error} type="error" />}
      </div>
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
          text="Remember me"
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
  )
}

export default LoginForm
