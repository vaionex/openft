import '@/styles/globals.css'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import CurrentUser from '@/components/common/current-user'
import AuthComponent from '@/components/auth'
import { AnimatePresence } from 'framer-motion'

function App({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Provider store={store}>
        <AuthComponent>
          <CurrentUser />
          <Component {...pageProps} />
        </AuthComponent>
      </Provider>
    </AnimatePresence>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
