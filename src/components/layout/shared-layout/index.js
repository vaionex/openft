import PropTypes from 'prop-types'
import Head from 'next/head'
import Footer from '../footer'
import Header from '../header'
import { twMerge } from 'tailwind-merge'
import { ToastContainer } from 'react-toastify'

const SharedLayout = ({ children, title, className }) => {
  return (
    <>
      <Head>
        <title>Nftana | {title}</title>
      </Head>

      <Header />
      <main className={twMerge('min-h-[calc(100vh-(6rem+12rem))]', className)}>
        <div className="absolute h-0">
          <ToastContainer />
        </div>
        {children}
      </main>
      <Footer />
    </>
  )
}

SharedLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default SharedLayout
