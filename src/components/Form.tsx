import { useSelector } from 'react-redux';
import { FormState } from '../interfaces/interfaces';
import { RootState } from '../store/store';

interface FormProps {
  onSubmit: (data: FormState) => void;
  formData: FormState;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onImageUpload: (base64: string) => void;
}

export default function Form({
  onSubmit,
  formData,
  onChange,
  onImageUpload,
}: FormProps) {
  const countries = useSelector((state: RootState) => state.form.countries);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name..."
          value={formData.name}
          onChange={onChange}
        />
      </div>

      {/* Age */}
      <div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Age..."
          min="0"
          max="120"
          value={formData.age}
          onChange={onChange}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={onChange}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
        />
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={onChange}
        >
          <option value="select">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          name="country"
          value={formData.country}
          onChange={onChange}
          list="countries"
          placeholder="Start typing a country..."
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>

      {/* Accept Terms */}
      <div>
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={onChange}
        />
        <label htmlFor="acceptTerms">I accept the Terms & Conditions</label>
      </div>

      {/* Image */}
      <div>
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          accept=".png, .jpeg"
          onChange={handleImageUpload}
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            style={{ width: '100px', height: '100px' }}
          />
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={!formData.acceptTerms}>
        Submit
      </button>
    </form>
  );
}
