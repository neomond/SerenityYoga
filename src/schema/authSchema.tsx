import * as yup from 'yup';
export const signInSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const signUpSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null as any], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const signInInitialValues = {
  email: '',
  password: '',
};

export const signUpInitialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};
