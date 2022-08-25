import { envMODE } from '../config/envMode'
import apiConfig from '@/config/relysiaApi'

let config
let storageBucket = ''

if (envMODE === 'DEV') {
  config = {
    apiKey: "AIzaSyBNb6ZPNHZ_7CnuWoX6w8N9Afy7eBWD-zs",
    authDomain: "relysia-20954105.firebaseapp.com",
    projectId: "relysia-20954105",
    storageBucket: "relysia-20954105.appspot.com",
    messagingSenderId: "563060461488",
    appId: "1:563060461488:web:9400c0335290def7e11075"
  };

  storageBucket =
    'https://firebasestorage.googleapis.com/v0/b/relysia-20954105.appspot.com/o/'

  apiConfig.defaults.headers.common['serviceId'] =
    '4ab366c6-042c-42cd-8360-8eb8e57a3eb2'
}

export default config
export const storageBucketUrl = storageBucket
