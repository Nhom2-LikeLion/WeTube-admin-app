import type { GET_MANAGER_INFO_FAILURE, GET_MANAGER_INFO_REQUEST, GET_MANAGER_INFO_SUCCESS } from "../../constants/managerInfoConstans";

export interface ManagerInfo {
  id: string;
  name: string;
  email: string;
  status: string;
  totalVideos: number;
  createdAt: string;
  updatedAt: string;
}

export interface ManagerInfoState {
    loading: boolean;
    managerInfo: ManagerInfo | null;
    error: string | null;
}

interface GetManagerInfoRequestAction {
    type: typeof GET_MANAGER_INFO_REQUEST;
}

interface GetManagerInfoSuccessAction {
    type: typeof GET_MANAGER_INFO_SUCCESS;
    payload: ManagerInfo;
}

interface GetManagerInfoFailureAction {
    type: typeof GET_MANAGER_INFO_FAILURE;
    payload: string;
}

export type ManagerInfoActionTypes =
    | GetManagerInfoRequestAction
    | GetManagerInfoSuccessAction
    | GetManagerInfoFailureAction;
