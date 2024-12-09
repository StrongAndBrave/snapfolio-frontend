import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://inctagram.work/api/v1/';

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: () => ({}),
});
