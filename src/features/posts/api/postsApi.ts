// import { baseApi } from '@/shared/api/baseApi';
// import {
//     PostType,
//     // GetPostsQueryParams,
//     ImageUploadResponse,
//     ImageUploadRequest,
//     UpdatePostByIdRequest,
//     GetWithPaginationRequest,
//     GetCommentsWithPaginationResponse,
//     GetAnswersWithPaginationResponse,
//     CreatePostRequest,
// } from './types';

// export const postsApi = baseApi.injectEndpoints({
//     endpoints: builder => ({
//         createPost: builder.mutation<PostType, CreatePostRequest>({
//             query: ({ description, childrenMetadata }) => ({
//                 url: '/api/v1/posts',
//                 method: 'POST',
//                 body: {
//                     description,
//                     childrenMetadata,
//                 },
//             }),
//         }),

//         getPostById: builder.query<PostType, { postId: number }>({
//             query: postId => ({
//                 url: `/api/v1/posts/id/${postId}`,
//             }),
//         }),

//         uploadImagePost: builder.mutation<ImageUploadResponse, ImageUploadRequest>({
//             query: ({ files }) => {
//                 const formData = new FormData();
//                 files.forEach(file => {
//                     formData.append('file', file);
//                 });

//                 return {
//                     url: '/api/v1/posts/image',
//                     method: 'POST',
//                     body: formData,
//                 };
//             },
//         }),

//         deleteImagePost: builder.mutation<void, { uploadId: string }>({
//             query: uploadId => ({
//                 url: `/api/v1/posts/image/${uploadId}`,
//                 method: 'DELETE',
//             }),
//         }),

//         updatePostById: builder.mutation<void, UpdatePostByIdRequest>({
//             query: ({ postId, description }) => ({
//                 url: `/api/v1/posts/${postId}`,
//                 method: 'PUT',
//                 body: { description },
//             }),
//         }),

//         deletePostById: builder.mutation<void, { postId: number }>({
//             query: postId => ({
//                 url: `/api/v1/posts/${postId}`,
//                 method: 'DELETE',
//             }),
//         }),

//         getCommentsWithPagination: builder.query<GetCommentsWithPaginationResponse, GetWithPaginationRequest>({
//             query: ({ postId, pageNumber, pageSize, sortBy, sortDirection }) => ({
//                 url: `/api/v1/${postId}/comments`,
//                 params: { pageNumber, pageSize, sortBy, sortDirection },
//             }),
//         }),

//         getAnswersWithPagination: builder.query<
//             GetAnswersWithPaginationResponse,
//             GetWithPaginationRequest & { commentId: number }
//         >({
//             query: ({ commentId, pageNumber, pageSize, postId, sortBy, sortDirection }) => ({
//                 url: `/api/v1/posts/${postId}/comments/${commentId}/answers`,
//                 params: { pageNumber, pageSize, sortBy, sortDirection },
//             }),
//         }),

//         getAnswerLikes: builder.query<>,
//         // getPosts: builder.query<PostType, GetPostsQueryParams>({
//         //     query: ({ userName, pageSize, pageNumber, sortBy, sortDirection }) => ({
//         //         url: `/api/v1/posts/${userName}`,
//         //         params: { pageSize, pageNumber, sortBy, sortDirection },
//         //     }),
//         // }),
//     }),
// });
