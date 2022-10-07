import { RegisterLogo } from '@/components/common/svgs'
import NextLink from 'next/link'
import RegistrationSteps from '../steps'

const ResetPasswordSide = () => {
  return (
    <div className="hidden max-w-lg col-span-4 md:block">
      <div className="w-full h-full bg-bottom bg-no-repeat bg-cover bg-reset-password-bg">
        <div className="flex flex-col justify-between h-full px-4 py-6 mx-auto md:py-10 sm:px-6 lg:px-8">
          <NextLink href="/">
            <a className="inline-block">
              <span className="sr-only">Workflow</span>
              <RegisterLogo />
            </a>
          </NextLink>
          <div className="flex-1 mt-20">
            <RegistrationSteps stepsType="circle" />
          </div>
          <div className="flex justify-between gap-2 text-blue-200">
            <span>© Vaionex 2022</span>
            <span>
              <a href="mailto:one@vaionex.com">
                <span className="sr-only">Email</span>
                one@vaionex.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordSide
