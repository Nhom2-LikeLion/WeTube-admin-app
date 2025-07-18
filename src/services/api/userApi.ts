import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
  createdAt: number;
  isPro: boolean;
};

export const userApi = createApi({
  reducerPath: "userApi", 
    baseQuery: fetchBaseQuery({
      baseUrl: "https://687076887ca4d06b34b6db53.mockapi.io/api/v1/",
    }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "users",
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
