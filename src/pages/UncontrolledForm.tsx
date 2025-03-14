import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSubmission } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { formSchema } from '../schema/yupSchema';
import Form from '../components/Form';
import { FormState } from '../interfaces/interfaces';
import { ValidationError } from 'yup';

export default function UncontrolledForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageUpload = (base64: string) => {
    if (formRef.current) {
      const imageInput = formRef.current.elements.namedItem(
        'image'
      ) as HTMLInputElement;
      imageInput.value = base64;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: FormState = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      country: formData.get('country') as string,
      acceptTerms: formData.get('acceptTerms') === 'on',
      image: formData.get('image') as string,
    };

    try {
      await formSchema.validate(data, { abortEarly: false });
      setErrors({});
      dispatch(setSubmission(data));
      navigate('/');
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <h2>Uncontrolled Form</h2>
      <Form
        onSubmit={handleSubmit}
        formRef={formRef}
        errors={errors}
        onImageUpload={handleImageUpload}
      />
    </>
  );
}
