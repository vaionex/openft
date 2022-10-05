import * as yup from 'yup'

const validationSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*?[A-Z])/, 'Password need upper case letter')
    .matches(/(?=.*?[a-z])/, 'Password need lower case letter')
    .matches(/(?=.*?[0-9])/, 'Password need number'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
})

export default validationSchema
