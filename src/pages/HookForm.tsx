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
    console.log('Form Data:', data);
    dispatch(setSubmission(data));
    navigate('/');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        alert('Only PNG and JPEG files are allowed');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        console.log('Base64:', base64);
        setValue('image', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputBox = 'grid grid-cols-3 gap-4 items-start mb-4 min-h-[5rem]';
  const label = 'col-span-1 min-h-[3rem] flex items-center font-medium';
  const inBox = 'col-span-2 min-h-[3rem]';
  const input = 'border p-2 rounded w-full';
  const error = 'text-red-500 mt-1 text-sm';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-10 border rounded-lg shadow-md max-w-xl mx-auto my-4"
    >
      {/* Name */}
      <div className={inputBox}>
        <label htmlFor="name" className={label}>
          Name
        </label>
        <div className={inBox}>
          <input {...register('name')} type="text" className={input} />
          {errors.name && <p className={error}>{errors.name.message}</p>}
        </div>
      </div>

      {/* Age */}
      <div className={inputBox}>
        <label htmlFor="age" className={label}>
          Age
        </label>
        <div className={inBox}>
          <input {...register('age')} type="number" className={input} />
          {errors.age && <p className={error}>{errors.age.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div className={inputBox}>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <div className={inBox}>
          <input {...register('email')} type="email" className={input} />
          {errors.email && <p className={error}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Password */}
      <div className={inputBox}>
        <label htmlFor="password" className={label}>
          Password
        </label>
        <div className={inBox}>
          <input {...register('password')} type="password" className={input} />
          {errors.password && (
            <p className={error}>{errors.password.message}</p>
          )}
        </div>
      </div>

      {/* Confirm Password */}
      <div className={inputBox}>
        <label htmlFor="confirmPassword" className={label}>
          Confirm Password
        </label>
        <div className={inBox}>
          <input
            {...register('confirmPassword')}
            type="password"
            className={input}
          />
          {errors.confirmPassword && (
            <p className={error}>{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {/* Gender */}
      <div className={inputBox}>
        <label htmlFor="gender" className={label}>
          Gender
        </label>
        <div className={inBox}>
          <select {...register('gender')} className={input}>
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className={error}>{errors.gender.message}</p>}
        </div>
      </div>

      {/* Country */}
      <div className={inputBox}>
        <label htmlFor="country" className={label}>
          Country
        </label>
        <div className={inBox}>
          <input
            {...register('country')}
            type="text"
            list="countries"
            placeholder="Start typing a country..."
            className={input}
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && <p className={error}>{errors.country.message}</p>}
        </div>
      </div>

      {/* Image Upload */}
      <div className={inputBox}>
        <label htmlFor="image" className={label}>
          Upload Image
        </label>
        <div className={inBox}>
          <input
            type="file"
            accept=".png, .jpeg"
            onChange={handleImageChange}
            className="file:border file:rounded file:px-4 file:py-2 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer w-full"
          />
          {errors.image && <p className={error}>{errors.image.message}</p>}
        </div>
      </div>
      <input type="hidden" {...register('image')} />

      {/* Terms */}
      <div className={inputBox}>
        <input
          {...register('acceptTerms')}
          type="checkbox"
          className="w-5 h-5 accent-accent rounded focus:ring-2 focus:ring-offset-2 focus:ring-accent mt-3.5 ml-20"
        />
        <div className={inBox}>
          <label htmlFor="acceptTerms" className={label}>
            I accept Terms & Conditions
          </label>
          {errors.acceptTerms && (
            <p className={error}>{errors.acceptTerms.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`py-2 px-4 rounded transition ${
          isValid
            ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Submit
      </button>
    </form>
  );
}
