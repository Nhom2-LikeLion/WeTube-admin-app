import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ManagerInfo } from '../../types/managerTypes/managerinfo';
import type { ReportState } from '../../types/managerTypes/managerReports';
import type { Video } from '../../types/managerTypes/managerVideo';


export const managerApi = createApi({
  reducerPath: 'managerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://687076897ca4d06b34b6db6f.mockapi.io/api/v1/',
  }),
  tagTypes: ['ManagerInfo', 'ManagerReports', 'ManagerVideos'],
  endpoints: (builder) => ({

    // 1. Thông tin Manager
    getManagerInfo: builder.query<ManagerInfo, string>({
      query: (id) => `Manager/${id}`,
      providesTags: ['ManagerInfo'],
    }),
    updateManagerInfo: builder.mutation<ManagerInfo, { id: string; data: Partial<ManagerInfo> }>({
      query: ({ id, data }) => ({
        url: `Manager/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ManagerInfo'],
    }),

    // 2. Báo cáo
    getManagerReportState: builder.query<ReportState, string>({
      query: (id) => `Manager/${id}`,
      providesTags: ['ManagerReports'],
    }),
    updateReportState: builder.mutation<ReportState, { id: string; data: Partial<ReportState> }>({
      query: ({ id, data }) => ({
        url: `managers/${id}/reports`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ManagerReports'],
    }),

    // 3. Video
    getManagerVideos: builder.query<Video[], string>({
      query: (id) => `Manager/${id}`,
      providesTags: ['ManagerVideos'],
    }),
    addVideo: builder.mutation<Video, { id: string; data: Partial<Video> }>({
      query: ({ id, data }) => ({
        url: `Manager/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ManagerVideos'],
    }),
    updateVideo: builder.mutation<Video, { id: string; videoId: string; data: Partial<Video> }>({
      query: ({ id, videoId, data }) => ({
        url: `managers/${id}/videos/${videoId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ManagerVideos'],
    }),
    deleteVideo: builder.mutation<{ success: boolean }, { id: string; videoId: string }>({
      query: ({ id, videoId }) => ({
        url: `managers/${id}/videos/${videoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ManagerVideos'],
    }),

  }),
});

export const {
  useGetManagerInfoQuery,
  useUpdateManagerInfoMutation,
  useGetManagerReportStateQuery,
  useUpdateReportStateMutation,
  useGetManagerVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = managerApi;