import PropTypes from 'prop-types'
import Head from 'next/head'
import Footer from '../footer'
import Header from '../header'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

const SharedLayout = ({ children, title, className }) => {
  return (
    <>
      <Head>
        <title>Openft | {title}</title>
      </Head>
      <motion.div
        exit={{
          opacity: 0,
        }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
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
