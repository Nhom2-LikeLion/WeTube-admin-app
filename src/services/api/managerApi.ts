import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ManagerInfo } from "../../types/managerTypes/managerInfo";

export const managerApi = createApi({
  reducerPath: "managerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://687076897ca4d06b34b6db6f.mockapi.io/api/v1/",
  }),
  tagTypes: ["ManagerInfo", "ManagerReports", "ManagerVideos", "Managers"],
  endpoints: (builder) => ({
    // Lấy danh sách Managers
    getManagers: builder.query<ManagerInfo[], void>({
      query: () => "Manager",
      providesTags: ["Managers"],
    }),

    // Lấy thông tin một Manager
    getManagerInfo: builder.query<ManagerInfo, string>({
      query: (id) => `Manager/${id}`,
      providesTags: ["ManagerInfo"],
    }),

    // Thêm Manager
    addManager: builder.mutation<ManagerInfo, Partial<ManagerInfo>>({
      query: (data) => ({
        url: "Manager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Managers"],
    }),

    // Cập nhật thông tin Manager
    updateManagerInfo: builder.mutation<
      ManagerInfo,
      { id: string; data: Partial<ManagerInfo> }
    >({
      query: ({ id, data }) => ({
        url: `Manager/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ManagerInfo", "Managers"],
    }),

    // Xóa Manager
    deleteManager: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `Manager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Managers"],
    }),
  }),
});

export const {
  useGetManagersQuery,
  useAddManagerMutation,
  useDeleteManagerMutation,
  useGetManagerInfoQuery,
  useUpdateManagerInfoMutation,
} = managerApi;
