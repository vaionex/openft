import * as yup from 'yup';

const validationSchema = yup.object().shape({
  destroy: yup.string().required("Please type 'destroy' "),
});

export default validationSchema;
