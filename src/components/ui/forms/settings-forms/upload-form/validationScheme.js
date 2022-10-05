import * as yup from 'yup'

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Artwork name is required')
    .min(4, 'Artwork name must be at least 4 characters'),
  supply: yup
    .number()
    .typeError('Price must be a number')
    .required('Supply number is required')
    .moreThan(0, 'Supply number must be bigger then 0'),
  amount: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .moreThan(0, 'Price must be bigger then 0'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(40, 'Description must be less then 40 characters'),
})

export default validationSchema
