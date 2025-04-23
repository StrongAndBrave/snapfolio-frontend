import { baseApi } from '@/shared/api/baseApi';
import {
    ImageUploadResponse,
    ImageUploadRequest,
    UpdatePostByIdRequest,
    CreatePostRequest,
    GetLikesResponse,
    UpdateLikeStatusPostRequest,
    GetPostLikesRequest,
    GetPostsByUsernameResponse,
    GetPostsByUsernameRequest,
    GetAllPostsRequest,
    GetAllPostsResponse,
    GetPostsByUserIdResponse,
    GetPostsByUserIdRequest,
    PostType,
    PublicProfile,
    ResponseCountRegisteredUsers,
} from './types/postTypes';

export const postsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        // GET

        getPostById: builder.query<PostType, { postId: number }>({
            query: ({ postId }) => ({
                url: `/api/v1/posts/id/${postId}`,
            }),
            providesTags: ['Post'],
        }),

        getPostLikes: builder.query<GetLikesResponse, GetPostLikesRequest>({
            query: ({ postId, pageNumber, pageSize, cursor, search }) => ({
                url: `/api/v1/posts/${postId}/likes`,
                params: { pageNumber, pageSize, cursor, search },
            }),
            providesTags: ['Post'],
        }),

        getPostsByUserName: builder.query<GetPostsByUsernameResponse, GetPostsByUsernameRequest>({
            query: ({ userName, pageSize, pageNumber, sortBy, sortDirection }) => ({
                url: `/api/v1/posts/${userName}`,
                params: { pageSize, pageNumber, sortBy, sortDirection },
            }),
            providesTags: ['Post'],
        }),

        getAllPosts: builder.query<GetAllPostsResponse, GetAllPostsRequest>({
            query: ({ endCursorPostId, pageSize, sortBy, sortDirection }) => ({
                url: `/api/v1/public-posts/all/${endCursorPostId}`,
                params: { pageSize, sortBy, sortDirection },
            }),
            providesTags: ['Post'],
        }),

        getPostsByUserId: builder.query<GetPostsByUserIdResponse, GetPostsByUserIdRequest>({
            query: ({ endCursorPostId, pageSize, sortBy, sortDirection, userId }) => ({
                url: `/api/v1/public-posts/user/${userId}/${endCursorPostId}`,
                params: { pageSize, sortBy, sortDirection },
            }),
            providesTags: ['Post'],
        }),

        getPublicPostById: builder.query<PostType, { postId: number }>({
            query: ({ postId }) => ({
                url: `/api/v1/public-posts/${postId}`,
            }),
            providesTags: ['Post'],
        }),

        getAllPublicUsers: builder.query<ResponseCountRegisteredUsers, void>({
            query: () => ({
                url: `/api/v1/public-user`,
            }),
            providesTags: ['User'],
        }),

        getPublicUserProfile: builder.query<PublicProfile, string>({
            query: userName => ({
                url: `/api/v1/public-user/profile/${userName}`,
            }),
            providesTags: ['User'],
        }),

        // POST

        createPost: builder.mutation<PostType, CreatePostRequest>({
            query: ({ description, childrenMetadata }) => ({
                url: '/api/v1/posts',
                method: 'POST',
                body: {
                    description,
                    childrenMetadata,
                },
            }),
            invalidatesTags: [{ type: 'Post' }],
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
            invalidatesTags: [{ type: 'Post' }],
        }),

        // PUT

        updatePostById: builder.mutation<void, UpdatePostByIdRequest>({
            query: ({ postId, description }) => ({
                url: `/api/v1/posts/${postId}`,
                method: 'PUT',
                body: { description },
            }),
            invalidatesTags: [{ type: 'Post' }],
        }),

        updateLikeStatusPost: builder.mutation<void, UpdateLikeStatusPostRequest>({
            query: ({ postId, likeStatus }) => ({
                url: `/api/v1/posts/${postId}/like-status`,
                method: 'PUT',
                body: { likeStatus },
            }),
            invalidatesTags: [{ type: 'Post' }],
        }),

        // DELETE

        deleteImagePost: builder.mutation<void, { uploadId: string }>({
            query: ({ uploadId }) => ({
                url: `/api/v1/posts/image/${uploadId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Post' }],
        }),

        deletePostById: builder.mutation<void, { postId: number }>({
            query: ({ postId }) => ({
                url: `/api/v1/posts/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Post' }],
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
    useGetAllPostsQuery,
    useGetPostsByUserIdQuery,

    useGetPublicUserProfileQuery,
    useGetAllPublicUsersQuery,
    useGetPublicPostByIdQuery,
} = postsApi;
