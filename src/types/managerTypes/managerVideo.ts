import type { GET_MANAGER_VIDEOS_FAILURE, GET_MANAGER_VIDEOS_REQUEST, GET_MANAGER_VIDEOS_SUCCESS } from "../../constants/managerInfoConstans";


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
