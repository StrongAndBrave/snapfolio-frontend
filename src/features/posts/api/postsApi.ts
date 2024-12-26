import { baseApi } from '@/shared/api/baseApi';

export const postsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<ResponseData, GetPostsQueryParams>({
            query: ({ userName, pageSize, pageNumber, sortBy, sortDirection }) => ({
                url: `/api/v1/posts/${userName}`,
                params: { pageSize, pageNumber, sortBy, sortDirection },
            }),
        }),
        getPostsById: builder.query<ResponseData, { postId: string }>({
            query: postId => ({
                url: `/api/v1/posts/id/${postId}`,
            }),
        }),
        createPost: builder.mutation<ResponseData, CreatePostMutationParams>({
            query: ({ description, childrenMetadata }) => ({
                url: '/api/v1/posts',
                method: 'POST',
                body: {
                    description,
                    childrenMetadata,
                },
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
    }),
});
