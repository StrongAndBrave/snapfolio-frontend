import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {RootState} from "@/app/store/store";

export const baseApi = createApi({
    reducerPath: 'inctagramApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const accessToken = state.auth?.accessToken;

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }

            headers.set('Content-Type', 'application/json');
            return headers;
        },
        credentials: 'include',
    }),
    endpoints: () => ({}),
    tagTypes: [],
});
