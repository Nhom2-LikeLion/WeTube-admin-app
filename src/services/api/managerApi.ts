import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { managerData } from "../../types/managerTypes/managerInfo";

export const managerApi = createApi({
  reducerPath: "managerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://687076897ca4d06b34b6db6f.mockapi.io/api/v1/",
  }),
  tagTypes: ["ManagerInfo", "ManagerVideos", "Managers"],
  endpoints: (builder) => ({
    // Lấy danh sách Managers
    getManagers: builder.query<managerData[], void>({
      query: () => "Manager",
      providesTags: ["Managers"],
    }),

    // Lấy thông tin một Manager
    getManagerInfo: builder.query<managerData, string>({
      query: (id) => `Manager/${id}`,
      providesTags: ["ManagerInfo"],
    }),

    // Thêm Manager
    addManager: builder.mutation<managerData, Partial<managerData>>({
      query: (data) => ({
        url: "Manager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Managers"],
    }),

    // Cập nhật thông tin Manager
    updateManagerInfo: builder.mutation<
      managerData,
      { id: string; data: Partial<managerData> }
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
    approveManager: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Manager/${id}`,
        method: "PATCH",
      }),
    }),
    rejectManager: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Manager/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetManagersQuery,
  useAddManagerMutation,
  useDeleteManagerMutation,
  useGetManagerInfoQuery,
  useUpdateManagerInfoMutation,
  useApproveManagerMutation,
  useRejectManagerMutation,
} = managerApi;
