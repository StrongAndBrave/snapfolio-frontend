import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://inctagram.work/api/v1/' });

type TokensResponse = {
    accessToken: string;
};

const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Попытка обновить токен
        const refreshResult = await baseQuery(
            {
                url: '/auth/update-tokens',
                method: 'POST',
                credentials: 'include',
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            // Сохранить новый токен и повторить исходный запрос
            localStorage.setItem('accessToken', (refreshResult.data as TokensResponse).accessToken);
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Обработка ошибки обновления токена
            api.dispatch({ type: '/auth/logout' });
        }
    }

    return result;
};

export default customBaseQuery;
