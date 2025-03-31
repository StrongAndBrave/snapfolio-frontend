// import { baseApi } from '@/shared/api/baseApi';
// import { GetPostsQueryParams, ResponseData } from '@/features/public-posts-posts/api/types';
//
// export const postsApi = baseApi.injectEndpoints({
//     endpoints: builder => ({
//         getPosts: builder.query<ResponseData, GetPostsQueryParams>({
//             query: ({ userName, pageSize, pageNumber, sortBy, sortDirection }) => ({
//                 url: `/api/v1/public-posts-posts/${userName}`,
//                 params: { pageSize, pageNumber, sortBy, sortDirection },
//             }),
//         }),
//         getPostsById: builder.query<ResponseData, { postId: string }>({
//             query: postId => ({
//                 url: `/api/v1/public-posts-posts/id/${postId}`,
//             }),
//         }),
//     }),
// });
//
// export const { useGetPostsQuery, useGetPostsByIdQuery } = postsApi;
