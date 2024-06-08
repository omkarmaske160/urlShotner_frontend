import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getAdminUsers: builder.query({
                query: () => {
                    return {
                        url: "/user",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["user"]
            }),
            getAdminUserUrls: builder.query({
                query: id => {
                    return {
                        url: `/user/url/${id}`,
                        method: "GET"
                    }
                },
                transformResponse: data => data.result
            }),
            updateAdminUser: builder.mutation({
                query: userData => {
                    return {
                        url: `/user/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                transformErrorResponse: err => err.data.message,
                invalidatesTags: ["user"]
            }),

        }
    }
})

export const {
    useLazyGetAdminUserUrlsQuery,
    useUpdateAdminUserMutation,
    useGetAdminUsersQuery
} = adminApi
