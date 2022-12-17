import NextLink from 'next/link'
import LoginForm from '@/components/ui/forms/login-form'
import LoginLayout from '@/components/layout/login-layout'
import { Logo } from '@/components/common/svgs'
import { GoogleIcon } from '@/components/common/icons'
import Image from 'next/image'
import LoginCarousel from '@/components/ui/carousels/login-carousel'
import { useDispatch } from 'react-redux'
import { loginWithGoogle } from '@/redux/slices/user'
import { useRouter } from 'next/router'

const testimonials = [
  {
    id: 1,
    text: 'Nftana is a next-gen open source NFT Exchange marketplace that anyone can contribute to develop or use this marketplace as their framework.',
    name: 'Jordan A',
    title: 'CEO, Coincombat',
    location: 'Canada, United States',
  },
  {
    id: 2,
    text: 'Nftana is a next-gen open source NFT Exchange marketplace that anyone can contribute to develop or use this marketplace as their framework.',
    name: 'Jordan A',
    title: 'CEO, Coincombat',
    location: 'Canada, United States',
  },
  {
    id: 3,
    text: 'Nftana is a next-gen open source NFT Exchange marketplace that anyone can contribute to develop or use this marketplace as their framework.',
    name: 'Jordan A',
    title: 'CEO, Coincombat',
    location: 'Canada, United States',
  },
]
const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleUserAuthWithGoogle = async () => {
    await dispatch(loginWithGoogle())
    router.push('/')
  }

  return (
    <LoginLayout title="Login">
      <div className="flex min-h-[calc(100vh-56px)] px-8 max-w-screen-2xl sm:mx-w-full max-w-full mx-auto">
        <div className="flex-[3] flex flex-col">
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-full py-4 pr-0 mx-auto lg:pr-8 xl:max-w-sm lg:max-w-full md:max-w-sm ">
              <div>
                <h2 className="text-4xl font-semibold text-gray-900">Log in</h2>
                <p className="mt-3 text-base font-normal text-gray-500">
                  Welcome back! Please enter your details.
                </p>
              </div>
              <div className="mt-8">
                <div className="mb-6">
                  <LoginForm />
                </div>

                <div>
                  <button
                    className="w-full text-base font-medium text-gray-700 bg-white border border-gray-300 btn-primary hover:bg-gray-100"
                    onClick={handleUserAuthWithGoogle}
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
                <NextLink href="/">
                  <p className='text-center text-gray-400 font-normal cursor-pointer pt-2 hover:text-gray-600 hover:duration-300'> back </p>
                </NextLink>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex pt-14 lg:items-end lg:justify-center relative w-0 flex-[3] ">
          <div className="relative flex items-end w-full h-full max-w-2xl p-10 overflow-hidden rounded-3xl ">
            <Image
              src="/images/login-bg.png"
              className="absolute inset-0 z-0 "
              alt="Login image"
              layout="fill"
              quality={90}
              objectFit="cover"
              priority
            />
            {/* <LoginCarousel data={testimonials} /> */}
          </div>
        </div>
      </div>
    </LoginLayout>
  )
}

export default Login
