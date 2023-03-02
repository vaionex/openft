import {
  firebaseGetUserDetailByEmail,
  firebaseIsUsernameExist,
} from '@/firebase/utils'
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth'
import * as yup from 'yup'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const nameRegex = /^[a-zA-Z\s]*$/
const usernameRegex = /^[a-z0-9]+$/

export default function validationSchema(isGoogleUser) {

  const validationsSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .matches(nameRegex, 'Please enter only letters')
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long'),
    username: yup
      .string()
      .trim()
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
    email: yup
      .string()
      .trim()
      .matches(emailRegex, 'Email is not valid')
      .test({
        name: 'is-email-in-use',
        message: 'This email is already in use',
        test: async function (value) {
          // const auth = getAuth()
          // return fetchSignInMethodsForEmail(auth, value)
          //   .then((data) => {
          //     return !data.length
          //   })
          //   .catch((error) => {
          //     if (error) {
          //       return true
          //     }
          //   })
          if (isGoogleUser) return true

          const user = await firebaseGetUserDetailByEmail(value)
          return !user.isExist
        },
      })
      .required('Email is required'),
    // role: yup
    // .string()
    // .trim()
    // .matches(nameRegex, 'Please enter only letters')
    // .required('Role is required')
    // .min(2, 'Role must be at least 2 characters long'),
  })

  return validationsSchema
}
