import { envMODE } from '../config/envMode'
import apiConfig from '../config/relysiaApi'

let config

if (envMODE === 'DEV') {
  config = {
    apiKey: 'AIzaSyBiRif-fL1DXYBOYXERmpSKRiODxt8GPTs',
    authDomain: 'for-my-test-7c54d.firebaseapp.com',
    projectId: 'for-my-test-7c54d',
    storageBucket: 'for-my-test-7c54d.appspot.com',
    messagingSenderId: '12348669238',
    appId: '1:12348669238:web:3e349cd50aa5cb0b808797',
  }

  // apiConfig.defaults.headers.common['serviceId'] =
  //   '9cf81e50-eeb9-40dd-a790-10a0813b48b5'
}

export default config
