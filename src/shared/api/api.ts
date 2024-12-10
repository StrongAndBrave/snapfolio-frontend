import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';

export const baseApi = createApi({
    baseQuery: customBaseQuery,
    endpoints: () => ({}),
});
