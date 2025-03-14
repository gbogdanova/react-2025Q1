import { useDispatch } from 'react-redux';
import Form from '../components/Form';
import { FormState } from '../interfaces/interfaces';
import { setSubmission } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function UncontrolledForm() {
  const [formDada, setFormData] = useState<FormState>({
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    country: '',
    acceptTerms: false,
    image: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (base64: string) => {
    setFormData((prev) => ({
      ...prev,
      image: base64,
    }));
  };

  const handleSubmit = (data: FormState) => {
    dispatch(setSubmission(data));
    navigate('/');
  };
  return (
    <>
      <h2>Uncontrolled Form</h2>
      <Form
        onSubmit={handleSubmit}
        formData={formDada}
        onChange={handleChange}
        onImageUpload={handleImageUpload}
      />
    </>
  );
}
