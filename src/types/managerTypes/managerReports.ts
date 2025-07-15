import type { GET_MANAGER_REPORT_FAILURE, GET_MANAGER_REPORT_REQUEST, GET_MANAGER_REPORT_SUCCESS } from "../../constants/managerInfoConstans";


export interface ReportState {
  totalReports: number;
  resolvedReports: number;
  unresolvedReports: number;
}

export interface ManagerReportState {
  loading: boolean;
  reportStats: ReportState | null;
  error: string | null;
}

interface GetManagerReportRequestAction {
  type: typeof GET_MANAGER_REPORT_REQUEST;
}

interface GetManagerReportSuccessAction {
  type: typeof GET_MANAGER_REPORT_SUCCESS;
  payload: ReportState;
}

interface GetManagerReportFailureAction {
  type: typeof GET_MANAGER_REPORT_FAILURE;
  payload: string;
}

export type ManagerReportActionTypes =
  | GetManagerReportRequestAction
  | GetManagerReportSuccessAction
  | GetManagerReportFailureAction;
