import PropTypes from 'prop-types'
import Head from 'next/head'
import Footer from '../footer'
import Header from '../header'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import pageTransitionVariants from '@/animations/page-transition'
import { useRouter } from 'next/router'

const SharedLayout = ({ children, title, className }) => {
  const { pathname } = useRouter()

  console.log(pathname)
  const runPageTransition = () => {
    return !pathname.includes('user-settings') && pageTransitionVariants
  }

  return (
    <>
      <Head>
        <title>Openft | {title}</title>
      </Head>
      <motion.div
        variants={runPageTransition()}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Header />
        <main className={twMerge('min-h-[600px]', className)}>{children}</main>
        <Footer />
      </motion.div>
    </>
  )
}

SharedLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default SharedLayout
