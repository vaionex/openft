import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import AuthComponent from '@/components/auth'
import CurrentUser from '@/components/common/current-user'
import { AnimatePresence } from 'framer-motion'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '@/styles/globals.css'

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
