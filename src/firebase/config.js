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
    'https://firebasestorage.googleapis.com/v0/b/openft-98e94.appspot.com/o/'

  apiConfig.defaults.headers.common['serviceId'] =
    '560fecbe-6479-47ba-907a-21e324b71d88'
}

export default config
export const storageBucketUrl = storageBucket
