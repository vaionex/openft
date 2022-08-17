import NextLink from 'next/link'
import LoginForm from '@/components/ui/forms/login-form'
import LoginRegisterLayout from '@/components/layout/login-register-layout'
import { Logo } from '@/components/common/svgs'
import { GoogleIcon } from '@/components/common/icons'
import Image from 'next/image'
import LoginCarousel from '@/components/ui/carousels/login-carousel'
import { firebaseLoginWithGoogle } from '@/firebase/utils'
import { useDispatch } from 'react-redux'
import { setAuthenticated } from '@/redux/slices/auth'
import { useRouter } from 'next/router'

const testimonials = [
  {
    id: 1,
    text: 'Openft is a next-gen open source NFT Exchange marketplace that anyone can contribute to develop or use this marketplace as their framework.',
    name: 'Jordan A',
    title: 'CEO, Coincombat',
    location: 'Canada, United States',
  },
  {
    id: 2,
    text: 'Openft is a next-gen open source NFT Exchange marketplace that anyone can contribute to develop or use this marketplace as their framework.',
    name: 'Jordan A',
    title: 'CEO, Coincombat',
    location: 'Canada, United States',
  },
  {
    id: 3,
    text: 'Openft is a next-gen open source NFT Exchange marketplace that anyone can contribute to develop or use this marketplace as their framework.',
    name: 'Jordan A',
    title: 'CEO, Coincombat',
    location: 'Canada, United States',
  },
]
const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleFirebaseAuthWithProvider = async () => {
    const userInfo = await firebaseLoginWithGoogle()
    if (userInfo) {
      dispatch(setAuthenticated())
      router.replace('/')
    }
  }

  return (
    <LoginRegisterLayout title="Login">
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
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Log in
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Welcome back! Please enter your details.
                </p>
              </div>
              <div className="mt-8">
                <div className="mb-6">
                  <LoginForm />
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
          <div className="relative flex items-end w-full h-full max-w-2xl p-10 overflow-hidden rounded-3xl ">
            <Image
              src="/images/login-bg.png"
              className="absolute inset-0 z-0 "
              alt="Login image"
              layout="fill"
              quality={90}
              objectFit="cover"
              priority={true}
            />
            <LoginCarousel data={testimonials} />
          </div>
        </div>
      </div>
    </LoginRegisterLayout>
  )
}

export default Login
