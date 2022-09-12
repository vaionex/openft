import * as yup from 'yup'

const validationSchema = yup.object().shape({
  artworkName: yup
    .string()
    .required('Artwork name is required')
    .min(6, 'Artwork name must be at least 4 characters'),
  supply: yup
    .number()
    .typeError('Price must be a number')
    .required('Supply number is required')
    .moreThan(0, 'Supply number must be bigger then 0'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .moreThan(0, 'Price must be bigger then 0'),
})

export default validationSchema
