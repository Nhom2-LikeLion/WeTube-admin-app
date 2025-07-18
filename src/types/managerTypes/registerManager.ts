
export interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Banned';
  dailyReports?: number;      
  processedReports?: number;  
  unprocessedReports?: number;
}