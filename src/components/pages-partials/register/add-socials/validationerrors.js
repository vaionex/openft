import * as yup from 'yup'

const validationError = yup.object().shape({
  instagram: yup.string().trim().required('Instagram username is required'),
  facebook: yup.string().trim().required('Facebook username is required'),
})

export default validationError
