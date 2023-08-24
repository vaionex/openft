import { firebaseIsUsernameExist } from '@/firebase/utils'
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth'
import * as yup from 'yup'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const nameRegex = /^[a-zA-Z\s]*$/

const validationSchema = yup.object().shape({
  'first-name': yup
    .string()
    .trim()
    .matches(nameRegex, 'Please enter only letters')
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters long'),
  'last-name': yup
    .string()
    .trim()
    .matches(nameRegex, 'Please enter only letters')
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters long'),
  email: yup
    .string()
    .trim()
    .matches(emailRegex, 'Email is not valid')
    .required('Email is required'),
  company: yup
    .string()
    .trim()
    .matches(nameRegex, 'Please enter only letters')
    .required('Company is required')
    .min(2, 'Company must be at least 2 characters long'),
  privacy: yup
    .boolean()
    .required('Please confirm privacy policy.')
    .oneOf([true], 'Please confirm privacy policy.'),
})

export default validationSchema
