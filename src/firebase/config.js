import { envMODE } from '../config/envMode'
import apiConfig from '@/config/relysiaApi'
import { projectServiceId } from '@/config/relysiaApi'

let config
let storageBucket = ''

if (envMODE === 'DEV') {
  config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }

  storageBucket =
    'https://firebasestorage.googleapis.com/v0/b/vaionexalpha.appspot.com/o/'

  apiConfig.defaults.headers.common['serviceId'] = projectServiceId
} else {
  config = {
    apiKey: 'AIzaSyCGzjD8zb2yJzRi6W54FJvfj55CWu_36q4',
    authDomain: 'hivedb-cdbf7.firebaseapp.com',
    projectId: 'hivedb-cdbf7',
    storageBucket: 'hivedb-cdbf7.appspot.com',
    messagingSenderId: '882176606224',
    appId: '1:882176606224:web:4b5a448b3bf607e1680a95',
    measurementId: 'G-89Z5B2W3KM',
  }
  storageBucket =
    'https://firebasestorage.googleapis.com/v0/b/hivedb-cdbf7.appspot.com/o/'
}

export default config
export const storageBucketUrl = storageBucket
