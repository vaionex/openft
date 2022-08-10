import Forms from './forms'
import LoginRegisterLayout from '@/components/layout/login-register-layout'
import HeadIcon from './head-icon'
import CircleSteps from './steps/stepsContainer'

const Register = () => {
  return (
    <LoginRegisterLayout title="Register">
      <div className="grid grid-cols-12 min-h-screen">
        <div className="hidden md:block col-span-4 bg-[#155DEE] max-w-lg">
          <div className="w-full h-full bg-contain bg-bottom bg-no-repeat bg-[url('/images/register-bg.webp')]">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <HeadIcon />
              <CircleSteps />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <Forms />
        </div>
      </div>
    </LoginRegisterLayout>
  )
}

export default Register
