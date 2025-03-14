import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../schema/yupSchema';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSubmission } from '../store/formSlice';
import { FormState } from '../interfaces/interfaces';
import { RootState } from '../store/store';

export default function HookForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormState>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.form.countries);

  const onSubmit = (data: FormState) => {
    dispatch(setSubmission(data));
    navigate('/');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Input */}
      <div>
        <label htmlFor="name">Name</label>
        <input {...register('name')} type="text" placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      {/* Age Input */}
      <div>
        <label htmlFor="age">Age</label>
        <input {...register('age')} type="number" placeholder="Age" />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email">Email</label>
        <input {...register('email')} type="email" placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password">Password</label>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {/* Confirm Password Input */}
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      {/* Gender Select */}
      <div>
        <label htmlFor="gender">Gender</label>
        <select {...register('gender')}>
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <span>{errors.gender.message}</span>}
      </div>

      {/* Country Input */}
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          {...register('country')}
          type="text"
          list="countries"
          placeholder="Start typing a country..."
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image">Upload Image</label>
        <input type="file" accept=".png, .jpeg" onChange={handleImageChange} />
        {errors.image && <p>{errors.image.message}</p>}
      </div>

      {/* Terms Checkbox */}
      <div>
        <input {...register('acceptTerms')} type="checkbox" />
        <label>I accept Terms & Conditions</label>
        {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
