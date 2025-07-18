import type { GET_MANAGER_VIDEOS_FAILURE, GET_MANAGER_VIDEOS_REQUEST, GET_MANAGER_VIDEOS_SUCCESS } from "../../constants/managerInfoConstans";

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
  dailyReports?: number;      // Số lượng báo cáo theo ngày
  weeklyReports?: number;     // Số lượng báo cáo theo tuần
  monthlyReports?: number;    // Số lượng báo cáo theo tháng
  processedReports?: number;  // Số lượng báo cáo đã xử lý
  unprocessedReports?: number; // Số lượng báo cáo chưa xử lý
}

export interface Video {
  id: string;
  title: string;
  status: string;
  uploadedAt: string;
}

export interface ManagerVideoState {
  loading: boolean;
  videos: Video[];
  error: string | null;
}

interface GetManagerVideosRequestAction {
  type: typeof GET_MANAGER_VIDEOS_REQUEST;
}

interface GetManagerVideosSuccessAction {
  type: typeof GET_MANAGER_VIDEOS_SUCCESS;
  payload: Video[];
}

interface GetManagerVideosFailureAction {
  type: typeof GET_MANAGER_VIDEOS_FAILURE;
  payload: string;
}

export type ManagerVideoActionTypes =
  | GetManagerVideosRequestAction
  | GetManagerVideosSuccessAction
  | GetManagerVideosFailureAction;