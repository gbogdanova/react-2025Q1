import { FormState } from '../interfaces/interfaces';

interface FormProps {
  onSubmit: (data: FormState) => void;
  formData: FormState;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function Form({ onSubmit, formData, onChange }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
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

      <div>
        <label htmlFor="age">Age</label>
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Age..."
          min="0"
          max="120"
          value={formData.age}
          onChange={onChange}
        />
      </div>

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

      {/* <label htmlFor="image">
            Upload Image:
            <input
              type="file"
              id="image"
              accept=".png, .jpeg"
            />
          </label> */}

      <div>
        <input
          type="checkbox"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={onChange}
        />
        <label>I accept the Terms & Conditions</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
