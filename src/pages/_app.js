import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import CurrentUser from '@/components/common/current-user'
import { AnimatePresence } from 'framer-motion'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'react-circular-progressbar/dist/styles.css'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { firebaseGetAuthorizedUser } from '@/firebase/utils'

function App({ Component, pageProps }) {
  useEffect(() => firebaseGetAuthorizedUser(), [])

  return (
    <AnimatePresence exitBeforeEnter>
      <Provider store={store}>
        <CurrentUser />
        <Component {...pageProps} />
      </Provider>
    </AnimatePresence>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
