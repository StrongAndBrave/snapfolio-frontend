import { baseApi } from '@/shared/api/baseApi';
import {
    ImageUploadResponse,
    ImageUploadRequest,
    UpdatePostByIdRequest,
    GetCommentsWithPaginationResponse,
    GetAnswersWithPaginationResponse,
    CreatePostRequest,
    CreatePostResponse,
    GetPostByIdResponce,
    GetCommentsWithPaginationRequest,
    GetAnswersWithPaginationRequest,
    GetAnswerLikesRequest,
    GetAnswerLikesResponse,
    GetCommentLikesResponse,
    GetCommentLikesRequest,
} from './types';

export const postsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
            query: ({ description, childrenMetadata }) => ({
                url: '/api/v1/posts',
                method: 'POST',
                body: {
                    description,
                    childrenMetadata,
                },
            }),
        }),

        getPostById: builder.query<GetPostByIdResponce, { postId: number }>({
            query: postId => ({
                url: `/api/v1/posts/id/${postId}`,
            }),
        }),

        uploadImagePost: builder.mutation<ImageUploadResponse, ImageUploadRequest>({
            query: ({ files }) => {
                const formData = new FormData();
                files.forEach(file => {
                    formData.append('file', file);
                });

                return {
                    url: '/api/v1/posts/image',
                    method: 'POST',
                    body: formData,
                };
            },
        }),

        deleteImagePost: builder.mutation<any, { uploadId: string }>({
            query: uploadId => ({
                url: `/api/v1/posts/image/${uploadId}`,
                method: 'DELETE',
            }),
        }),

        updatePostById: builder.mutation<any, UpdatePostByIdRequest>({
            query: ({ postId, description }) => ({
                url: `/api/v1/posts/${postId}`,
                method: 'PUT',
                body: { description },
            }),
        }),

        deletePostById: builder.mutation<any, { postId: number }>({
            query: postId => ({
                url: `/api/v1/posts/${postId}`,
                method: 'DELETE',
            }),
        }),

        getCommentsWithPagination: builder.query<GetCommentsWithPaginationResponse, GetCommentsWithPaginationRequest>({
            query: ({ postId, pageNumber, pageSize, sortBy, sortDirection }) => ({
                url: `/api/v1/${postId}/comments`,
                params: { pageNumber, pageSize, sortBy, sortDirection },
            }),
        }),

        getAnswersWithPagination: builder.query<GetAnswersWithPaginationResponse, GetAnswersWithPaginationRequest>({
            query: ({ commentId, pageNumber, pageSize, postId, sortBy, sortDirection }) => ({
                url: `/api/v1/posts/${postId}/comments/${commentId}/answers`,
                params: { pageNumber, pageSize, sortBy, sortDirection },
            }),
        }),

        getAnswerLikes: builder.query<GetAnswerLikesResponse, GetAnswerLikesRequest>({
            query: ({ postId, answerId, commentId, cursor, pageNumber, pageSize, search }) => ({
                url: `api/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
                params: { cursor, pageNumber, pageSize, search },
            }),
        }),
        getCommentsLikes: builder.query<GetCommentLikesResponse, GetCommentLikesRequest>({
            query: ({ postId, commentId, cursor, pageNumber, pageSize, search }) => ({
                url: `api/v1/posts/${postId}/comments/${commentId}/likes`,
                params: { cursor, pageNumber, pageSize, search },
            }),
        }),
        // getPosts: builder.query<PostType, GetPostsQueryParams>({
        //     query: ({ userName, pageSize, pageNumber, sortBy, sortDirection }) => ({
        //         url: `/api/v1/posts/${userName}`,
        //         params: { pageSize, pageNumber, sortBy, sortDirection },
        //     }),
        // }),
    }),
});
