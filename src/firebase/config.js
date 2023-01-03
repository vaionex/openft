import { envMODE } from '../config/envMode'
import apiConfig from '@/config/relysiaApi'

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

  apiConfig.defaults.headers.common['serviceId'] =
    '7a8ca3a7-02bb-42e8-9d70-dec87390c0fd'
}

export default config
export const storageBucketUrl = storageBucket
