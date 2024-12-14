import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Mutex} from "async-mutex";
import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {login, logout} from "@/features/auth/model/authSlice";

type TokensResponse = {
    accessToken: string;
};

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

const mutex = new Mutex();
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock(); // Ждём, пока mutex разблокируется
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire(); // Лочим mutex
            try {
                const refreshResult = await baseQuery(
                    {
                        url: '/api/v1/auth/update-tokens',
                        method: 'POST',
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {

                    localStorage.setItem('accessToken', (refreshResult.data as TokensResponse).accessToken);

                    api.dispatch(login())

                    // Повторяем запрос с новым токеном
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release(); // Освобождаем mutex
            }
        } else {
            await mutex.waitForUnlock(); // Ждём, пока другой поток освободит mutex
            result = await baseQuery(args, api, extraOptions); // Повторяем запрос
        }
    }

    return result;
};