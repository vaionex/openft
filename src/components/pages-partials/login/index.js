import NextLink from 'next/link'
import LoginForm from '@/components/ui/forms/login-form'
import LoginRegisterLayout from '@/components/layout/login-register-layout'
import { Logo } from '@/components/common/svgs'
import { GoogleIcon } from '@/components/common/icons'
import Image from 'next/image'
import LoginCarousel from '@/components/ui/carousels/login-carousel'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_3.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
  {
    id: 6,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/mock-carousel/Image_1.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    priceType: 'BSV 1',
    color: 'Black',
  },
]

const Login = () => {
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
                    // onClick={() => handleFirebaseAuthWithProvider('GOOGLE')}
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
          <div className="relative inline-block w-full h-full max-w-2xl overflow-hidden rounded-3xl ">
            <Image
              src="/images/login-bg.png"
              className="absolute inset-0 z-0 "
              alt="Login image"
              layout="fill"
              quality={100}
              objectFit="cover"
            />
          </div>

          {/* <LoginCarousel data={products} /> */}
        </div>
      </div>
    </LoginRegisterLayout>
  )
}

export default Login
