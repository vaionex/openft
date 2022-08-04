import Head from 'next/head'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import pageTransitionVariants from '@/animations/page-transition'
import Footer from '../footer'
import { twMerge } from 'tailwind-merge'

const LoginRegisterLayout = ({ children, title, className }) => {
  return (
    <>
      <Head>
        <title>Openft | {title}</title>
      </Head>
      <motion.div
        variants={pageTransitionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <main className={twMerge('min-h-[600px]', className)}>{children}</main>
        <Footer page="login" />
      </motion.div>
    </>
  )
}

LoginRegisterLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default LoginRegisterLayout
