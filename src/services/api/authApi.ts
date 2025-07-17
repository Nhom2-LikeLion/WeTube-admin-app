import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthInfo } from "../../types/userManager/authInfo";

/**
 * RTK Query API slice for authentication-related requests
 */
export const authApi = createApi({
    reducerPath: "authApi", // Unique key for storing reducer state in the store

    baseQuery: fetchBaseQuery({
        baseUrl: "https://68762e68814c0dfa653b06a0.mockapi.io", // Base URL for all requests
    }),

    tagTypes: ["authInfos", "auth"], // Tags for automatic cache invalidation and refetching

    endpoints: (builder) => ({
        /**
         * Query to authenticate admin users by email and password
         * 
         * @param email - User email
         * @param password - User password
         * @returns List of matched admin accounts
         */
        Auth: builder.query<AuthInfo[], { email: string; password: string }>({
            query: ({ email, password }) =>
                `/admins?email=${email}&password=${password}`, // Example: /admins?email=test@mail.com&password=1234
        }),
    }),
});

// Exporting hook for component usage
export const {
    useAuthQuery, // Usage: const { data, error, isLoading } = useAuthQuery({ email, password })
} = authApi;
