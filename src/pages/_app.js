import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { AnimatePresence } from 'framer-motion'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'react-circular-progressbar/dist/styles.css'
import '@/styles/globals.css'
import '@etchteam/next-pagination/dist/index.css'
import { useEffect } from 'react'
import {
  firebaseGetAuthorizedUser,
  firebaseOnIdTokenChange,
} from '@/firebase/utils'
import { setAuthenticated } from '@/redux/slices/user'
import ProtectedRoute from '@/components/common/protected-route'

function App({ Component, pageProps }) {
  useEffect(() => {
    const unsubscribe = firebaseGetAuthorizedUser()
    firebaseOnIdTokenChange()

    return () => unsubscribe()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <Provider store={store}>
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      </Provider>
    </AnimatePresence>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
