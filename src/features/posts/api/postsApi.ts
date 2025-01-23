import { baseApi } from '@/shared/api/baseApi';
import {
    ImageUploadResponse,
    ImageUploadRequest,
    UpdatePostByIdRequest,
    GetCommentsResponse,
    GetAnswersResponse,
    CreatePostRequest,
    CreatePostResponse,
    GetPostByIdResponse,
    GetCommentsRequest,
    GetAnswersRequest,
    GetAnswerLikesRequest,
    GetLikesResponse,
    GetCommentLikesRequest,
    UpdateLikeStatusPostRequest,
    GetPostLikesRequest,
    GetPostsByUsernameResponse,
    GetPostsByUsernameRequest,
    GetAllPostsRequest,
    GetAllPostsResponse,
    GetPostsByUserIdResponse,
    GetPostsByUserIdRequest,
    GetCommentsForUnauthorizedUsersResponse,
    GetCommentsForUnauthorizedUsersRequest,
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

        getPostById: builder.query<GetPostByIdResponse, { postId: number }>({
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

        deleteImagePost: builder.mutation<void, { uploadId: string }>({
            query: uploadId => ({
                url: `/api/v1/posts/image/${uploadId}`,
                method: 'DELETE',
            }),
        }),

        updatePostById: builder.mutation<void, UpdatePostByIdRequest>({
            query: ({ postId, description }) => ({
                url: `/api/v1/posts/${postId}`,
                method: 'PUT',
                body: { description },
            }),
        }),

        deletePostById: builder.mutation<void, { postId: number }>({
            query: postId => ({
                url: `/api/v1/posts/${postId}`,
                method: 'DELETE',
            }),
        }),

        updateLikeStatusPost: builder.mutation<void, UpdateLikeStatusPostRequest>({
            query: ({ postId, likeStatus }) => ({
                url: `/api/v1/posts/${postId}/like-status`,
                method: 'PUT',
                body: { likeStatus },
            }),
        }),

        getPostLikes: builder.query<GetLikesResponse, GetPostLikesRequest>({
            query: ({ postId, pageNumber, pageSize, cursor, search }) => ({
                url: `/api/v1/posts/${postId}/likes`,
                params: { pageNumber, pageSize, cursor, search },
            }),
        }),

        getPostsByUserName: builder.query<GetPostsByUsernameResponse, GetPostsByUsernameRequest>({
            query: ({ userName, pageSize, pageNumber, sortBy, sortDirection }) => ({
                url: `/api/v1/posts/${userName}`,
                params: { pageSize, pageNumber, sortBy, sortDirection },
            }),
        }),

        getAllPosts: builder.query<GetAllPostsResponse, GetAllPostsRequest>({
            query: ({ endCursorPostId, pageSize, sortBy, sortDirection }) => ({
                url: `/api/v1/public-posts/all/${endCursorPostId}`,
                params: { pageSize, sortBy, sortDirection },
            }),
        }),

        getPostsByUserId: builder.query<GetPostsByUserIdResponse, GetPostsByUserIdRequest>({
            query: ({ endCursorPostId, pageSize, sortBy, sortDirection, userId }) => ({
                url: `/api/v1/public-posts/user/${userId}/${endCursorPostId}`,
                params: { pageSize, sortBy, sortDirection },
            }),
        }),

        // getPostById: builder.query<GetPostByIdResponse, { postId: number }>({
        //     query: ({ postId }) => ({
        //         url: `/api/v1/public-posts/${postId}`,
        //     }),
        // }),

        getCommentsForUnauthorizedUsers: builder.query<
            GetCommentsForUnauthorizedUsersResponse,
            GetCommentsForUnauthorizedUsersRequest
        >({
            query: ({ pageNumber, pageSize, postId, sortBy, sortDirection }) => ({
                url: `/api/v1/public-posts/${postId}/comments`,
                params: { pageNumber, pageSize, sortBy, sortDirection },
            }),
        }),
    }),
});

export const {
    useCreatePostMutation,
    useGetPostByIdQuery,
    useUploadImagePostMutation,
    useDeleteImagePostMutation,
    useUpdatePostByIdMutation,
    useDeletePostByIdMutation,
    useUpdateLikeStatusPostMutation,
    useGetPostLikesQuery,
    useGetPostsByUserNameQuery,
} = postsApi;
