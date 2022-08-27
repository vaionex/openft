import { firebaseIsUsernameExist } from '@/firebase/utils'
import * as yup from 'yup'

const usernameRegex = /^[a-z0-9]+$/

const myProfileValidationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(usernameRegex, 'Please enter only lowercase letters and numbers')
    .test({
      name: 'is-username-in-use',
      message: 'This username is already in use',
      test: async function (value) {
        return firebaseIsUsernameExist(value)
          .then((data) => {
            return !data
          })
          .catch((error) => {
            if (error) {
              return true
            }
          })
      },
    })
    .required('Username is required'),
})

export default myProfileValidationSchema
