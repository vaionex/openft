import * as yup from 'yup'

const validationError = yup.object().shape({
  instagram: yup.string().trim(),
  facebook: yup.string().trim(),
})

export default validationError
