export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  country: string;
  image?: string | null;
}

export interface DataState {
  submissions: FormState[];
  countries: string[];
}
