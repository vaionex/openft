import Head from 'next/head'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { Logo, RegisterLogo } from '@/components/common/svgs'
import { StepsContainer } from './steps'
import pageTransitionVariants from '@/animations/page-transition'
import PropTypes from 'prop-types'

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
          <div className="hidden max-w-lg col-span-4 md:block">
            <div className="w-full h-full bg-bottom bg-no-repeat bg-cover bg-registration-bg">
              <div className="flex flex-col h-full px-4 py-6 mx-auto md:py-10 sm:px-6 lg:px-8">
                <NextLink href="/">
                  <a className="inline-block">
                    <span className="sr-only">Workflow</span>
                    <RegisterLogo />
                  </a>
                </NextLink>
                <div className="flex-1 mt-20">
                  <StepsContainer stepsType="circle" />
                </div>
                <div className="flex justify-between gap-2 text-blue-200">
                  <span>© Vaionex 2022</span>
                  <span>
                    <a href="mailto:one@vaionex.com">
                      <span className="sr-only">Email</span>
                      one@vaionex.comm
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="px-4 mx-auto md:hidden sm:px-6 lg:px-8">
              <NextLink href="/">
                <a className="inline-block mt-10">
                  <span className="sr-only">Workflow</span>
                  <Logo />
                </a>
              </NextLink>
            </div>
            <div className="flex flex-col h-full py-12 sm:px-6 lg:px-8">
              <StepsContainer stepsType="box" />
              {children}

              <div className="flex flex-col justify-end pt-10 sm:pt-0">
                <StepsContainer stepsType="line" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

RegistrationLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RegistrationLayout
