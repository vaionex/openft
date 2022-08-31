import * as yup from 'yup'

const nameRegex = /^[a-z0-9A-Z\s]*$/
const amountRegex = /^[+]?([.]\d+|\d+[.]?\d*)$/

const validationSchema = yup.object().shape({
  address: yup
    .string()
    .matches(nameRegex, 'Please enter only letters or numbers')
    .required('Address or paymail is required'),
  amount: yup
    .string()
    .matches(amountRegex, 'Please enter a usable amount')
    .required('Amount is required'),
})

export default validationSchema
