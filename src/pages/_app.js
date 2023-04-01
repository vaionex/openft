import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'react-circular-progressbar/dist/styles.css'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Suspense, useEffect, useState } from 'react'
import {
  firebaseGetAuthorizedUser,
  firebaseOnIdTokenChange,
} from '@/firebase/utils'
import ProtectedRoute from '@/components/common/protected-route'
import { disconnectRelysiaSocket } from '@/services/relysia-socket'
import NextSeo from 'next-seo'
import RootLayout from '../components/layout/RootLayout' // Import RootLayout component

function App({ Component, pageProps }) {
  useEffect(() => {
    const unsubscribe = firebaseGetAuthorizedUser()
    firebaseOnIdTokenChange()

    return () => {
      unsubscribe()
      disconnectRelysiaSocket()
    }
  }, [])

  return (
    <Provider store={store}>
      <RootLayout>
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      </RootLayout>
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
