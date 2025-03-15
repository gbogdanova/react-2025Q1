import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name should start with an uppercase letter')
    .required('Name is required'),

  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),

  email: yup.string().email('Invalid email').required('Email is required'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),

  gender: yup.string().required('Gender is required'),

  acceptTerms: yup
    .boolean()
    .required('You must accept the Terms and Conditions')
    .oneOf([true], 'You must accept the Terms and Conditions'),

  country: yup.string().required('Country is required'),

  image: yup
    .string()
    .nullable()
    .notRequired()
    .test('fileSize', 'Image size is too large', (value) => {
      if (!value) return true;
      // Approximate size limit for base64 (~2MB)
      return value.length <= 3_000_000;
    })
    .test('fileType', 'Only PNG or JPEG files are allowed', (value) => {
      if (!value) return true;
      return (
        value.startsWith('data:image/png') ||
        value.startsWith('data:image/jpeg')
      );
    }),
});
