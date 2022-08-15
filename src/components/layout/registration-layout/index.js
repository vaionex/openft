import Head from 'next/head'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { RegisterLogo } from '@/components/common/svgs'
import { CircleSteps, StepsContainer } from './steps'
import pageTransitionVariants from '@/animations/page-transition'

const RegistrationLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Openft | Register</title>
      </Head>
      <motion.div
        variants={pageTransitionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="grid min-h-screen grid-cols-12">
          <div className="hidden md:block col-span-4 bg-[#155DEE] max-w-lg">
            <div className="w-full h-full bg-bottom bg-no-repeat bg-contain bg-registration-bg">
              <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <NextLink href="/">
                  <a className="inline-block mt-10">
                    <span className="sr-only">Workflow</span>
                    <RegisterLogo />
                  </a>
                </NextLink>
                <StepsContainer stepsType="box" />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="flex flex-col h-full py-12 sm:px-6 lg:px-8">
              <StepsContainer stepsType={'box'} />
              {children}

              <div className="flex flex-col justify-end pt-10 sm:pt-0">
                <StepsContainer stepsType={'line'} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default RegistrationLayout
