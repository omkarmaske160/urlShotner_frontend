import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`, credentials: 'include' }),
    tagTypes: ["url"],
    endpoints: (builder) => {
        return {
            getUrl: builder.query({
                query: () => {
                    return {
                        url: "/url",
                        method: "GET"
                    }
                },
                providesTags: ["url"],

                transformResponse: (data) => data.result
            }),
            addUrl: builder.mutation({
                query: (urlData) => {
                    return {
                        url: `/url-create`,
                        method: "POST",
                        body: urlData
                    }
                },
                transformErrorResponse: err => err.data.message,
                invalidatesTags: ["url"]
            }),
            updateUrl: builder.mutation({
                query: (urlData) => {
                    return {
                        url: `/url-update/${urlData._id}`,
                        method: "PUT",
                        body: urlData
                    }
                },
                invalidatesTags: ["url"]
            }),
            deleteUrl: builder.mutation({
                query: id => {
                    return {
                        url: `/url-remove/${id}`,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["url"]
            }),


        }
    }
})

export const {
    useGetUrlQuery,
    useAddUrlMutation,
    useUpdateUrlMutation,
    useDeleteUrlMutation
} = userApi
