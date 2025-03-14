import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  formRef?: React.RefObject<HTMLFormElement | null>;
  errors: Record<string, string>;
  onImageUpload: (base64: string) => void;
}

export default function Form({
  onSubmit,
  formRef,
  errors,
  onImageUpload,
}: FormProps) {
  const countries = useSelector((state: RootState) => state.form.countries);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ✅ Validate file size and type
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
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <div>
        <label htmlFor="name">Name</label>
        <input name="name" type="text" />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input name="age" type="number" />
        {errors.age && <p>{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm</label>
        <input name="confirmPassword" type="confirmPassword" />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <select name="gender">
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <span>{errors.gender}</span>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="country"
          name="country"
          list="countries"
          placeholder="Start typing a country..."
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p>{errors.country}</p>}
      </div>

      <div>
        <label htmlFor="image">Upload Image</label>
        <input type="file" accept=".png, .jpeg" onChange={handleImageChange} />
        {errors.image && <p>{errors.image}</p>}
      </div>

      <div>
        <input name="acceptTerms" type="checkbox" />
        <label>I accept Terms & Conditions</label>
        {errors.acceptTerms && <p>{errors.acceptTerms}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
