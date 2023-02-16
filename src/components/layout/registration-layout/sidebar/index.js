import { RegisterLogo } from '@/components/common/svgs'
import NextLink from 'next/link'
import RegistrationSteps from '../steps'

const RegistrationPageSidebar = () => {
  return (
    <div className="hidden max-w-lg col-span-4 md:block">
      <div className="w-full h-full bg-bottom bg-no-repeat bg-cover bg-registration-bg">
        <div className="flex flex-col h-full px-4 py-6 mx-auto md:py-10 sm:px-6 lg:px-8">
          <NextLink href="/" className="outline-none inline-block">
            <div className="flex items-center cursor-pointer">
              <span className="sr-only">Workflow</span>
              <div className="w-5 h-5">
                <img
                  className="h-5 pb-0.5 flex-none"
                  src="https://www.relysia.com/_next/static/media/RelysiaLogo_1.4aba7d51.svg"
                  alt="Relysia"
                />
              </div>
              <p className="pl-2 font-semibold text-xl text-bright-gray">
                Nftana
              </p>
            </div>
          </NextLink>

          <div className="flex-1 mt-20">
            <RegistrationSteps stepsType="circle" />
          </div>
          <div className="flex justify-between gap-2 text-blue-200">
            <span>© Vaionex 2023</span>
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

export default RegistrationPageSidebar
