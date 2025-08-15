
export interface RHFRegisterFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  status: 'Pending'| 'Approved' | 'Rejected' | 'Banned';
}