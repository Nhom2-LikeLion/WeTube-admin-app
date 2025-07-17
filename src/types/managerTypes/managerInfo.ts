import type { GET_MANAGER_INFO_FAILURE, GET_MANAGER_INFO_REQUEST, GET_MANAGER_INFO_SUCCESS } from "../../constants/managerInfoConstans";

export interface managerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  status: 'Pending' | 'Approved' | 'Rejected';
  dailyReports?: number;      // Số lượng báo cáo theo ngày
  weeklyReports?: number;     // Số lượng báo cáo theo tuần
  monthlyReports?: number;    // Số lượng báo cáo theo tháng
  processedReports?: number;  // Số lượng báo cáo đã xử lý
  unprocessedReports?: number; // Số lượng báo cáo chưa xử lý
}

export interface ManagerInfoState {
    loading: boolean;
    managerInfo: managerData | null;
    error: string | null;
}

interface GetManagerInfoRequestAction {
    type: typeof GET_MANAGER_INFO_REQUEST;
}

interface GetManagerInfoSuccessAction {
    type: typeof GET_MANAGER_INFO_SUCCESS;
    payload: managerData;
}

interface GetManagerInfoFailureAction {
    type: typeof GET_MANAGER_INFO_FAILURE;
    payload: string;
}

export type ManagerInfoActionTypes =
    | GetManagerInfoRequestAction
    | GetManagerInfoSuccessAction
    | GetManagerInfoFailureAction;