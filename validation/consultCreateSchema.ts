import * as yup from 'yup';

export const consultCreateSchema = yup.object().shape({
  name: yup.string().required('Введіть ваше ім\'я'),
  phone: yup
    .string()
    .matches(/^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введіть коректний номер')
    .required('Введіть коректний номер'),
  clientType: yup
    .string()
    .oneOf(['new', 'existing'], 'Оберіть один з варіантів')
    .required('Оберіть один з варіантів'),
  question: yup.string(),
});
