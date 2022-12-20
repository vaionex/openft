import * as yup from 'yup'

const validationSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  newPassword: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
  // .matches(/^(?=.*?[A-Z])/, 'Password need upper case letter')
  // .matches(/(?=.*?[a-z])/, 'Password need lower case letter')
  // .matches(/(?=.*?[0-9])/, 'Password need number'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
})

export default validationSchema
