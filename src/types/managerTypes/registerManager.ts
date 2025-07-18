
export interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  status: 'Pending';
  dailyReports?: number;      
  processedReports?: number;  
  unprocessedReports?: number;
}