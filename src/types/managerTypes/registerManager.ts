
export interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  status: 'Pending';
}