import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const urlApi = createApi({
    reducerPath: "urlApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/url` }),
    tagTypes: ["urlApi"],
    endpoints: (builder) => {
        return {
            getPublicUrl: builder.query({
                query: id => {
                    return {
                        url: `/${id}`,
                        method: "GET",
                        // body:id
                    }

                },
                invalidatesTags: ["urlApi"],
                transformResponse: data => data.result
            }),
        }
    }
})

export const { useGetPublicUrlQuery } = urlApi
