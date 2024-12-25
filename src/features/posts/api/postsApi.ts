import { baseApi } from '@/shared/api/baseApi';

export const postsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<ResponseData, GetPostsQueryParams>({
            query: ({ userName, pageSize, pageNumber, sortBy, sortDirection }) => ({
                url: `/api/v1/${userName}`,
                params: { pageSize, pageNumber, sortBy, sortDirection },
            }),
        }),
    }),
});
