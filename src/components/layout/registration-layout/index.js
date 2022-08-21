import Head from 'next/head'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { Logo } from '@/components/common/svgs'
import { StepsContainer } from './steps'
import pageTransitionVariants from '@/animations/page-transition'
import PropTypes from 'prop-types'
import RegistrationPageSidebar from './sidebar'

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
          <RegistrationPageSidebar />

          <div className="col-span-12 md:col-span-8">
            <div className="px-4 mx-auto md:hidden sm:px-6 lg:px-8">
              <NextLink href="/">
                <a className="inline-block mt-10">
                  <span className="sr-only">Workflow</span>
                  <Logo />
                </a>
              </NextLink>
            </div>
            <div className="flex flex-col h-full py-12 sm:gap-8 sm:px-6 lg:px-8">
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
