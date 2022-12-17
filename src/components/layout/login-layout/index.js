import Head from 'next/head'
import PropTypes from 'prop-types'
import Footer from '../footer'
import { twMerge } from 'tailwind-merge'

const LoginLayout = ({ children, title, className }) => {
  return (
    <>
      <Head>
        <title>Nftana | {title}</title>
      </Head>

      <main className={twMerge('min-h-[600px]', className)}>{children}</main>
      {title === 'Login' && <Footer page="login" />}
    </>
  )
}

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default LoginLayout
