import * as yup from 'yup'

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(0.01, 'Price must be equla to or bigger then 0.01'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must be less then 40 characters'),
})

export default validationSchema
