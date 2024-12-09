import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'inctagramApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: headers => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        credentials: 'include',
    }),
    endpoints: () => ({}),
    tagTypes: [],
});
