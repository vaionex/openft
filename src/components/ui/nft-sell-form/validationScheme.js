import * as yup from 'yup'

const validationSchema = yup.object().shape({
  amountInBSV: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(0, 'Price must be equal to or bigger than 0'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must be less than 40 characters'),
})

export default validationSchema
