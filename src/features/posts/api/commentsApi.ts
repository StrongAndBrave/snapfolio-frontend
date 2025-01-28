import { baseApi } from '@/shared/api/baseApi';
import {
    CommentType,
    CreateAnswerRequest,
    CreateCommentRequest,
    GetAnswerLikesRequest,
    GetAnswersRequest,
    GetAnswersResponse,
    GetCommentLikesRequest,
    GetCommentsForUnauthorizedUsersRequest,
    GetCommentsForUnauthorizedUsersResponse,
    GetCommentsRequest,
    GetCommentsResponse,
    GetLikesResponse,
    UpdateLikeStatusAnswerRequest,
    UpdateLikeStatusCommentRequest,
} from './types/commentsTypes';

export const commentApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        // GET

        getComment: builder.query<GetCommentsResponse, GetCommentsRequest>({
            query: ({ postId, pageNumber, pageSize, sortBy, sortDirection }) => ({
                url: `/api/v1/${postId}/comments`,
                params: { pageNumber, pageSize, sortBy, sortDirection },
            }),
            providesTags: ['Comment'],
        }),
        getAnswers: builder.query<GetAnswersResponse, GetAnswersRequest>({
            query: ({ commentId, pageNumber, pageSize, postId, sortBy, sortDirection }) => ({
                url: `/api/v1/posts/${postId}/comments/${commentId}/answers`,
                params: { pageNumber, pageSize, sortBy, sortDirection },
            }),
            providesTags: ['Comment'],
        }),

        getAnswerLikes: builder.query<GetLikesResponse, GetAnswerLikesRequest>({
            query: ({ postId, answerId, commentId, cursor, pageNumber, pageSize, search }) => ({
                url: `api/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
                params: { cursor, pageNumber, pageSize, search },
            }),
            providesTags: ['Comment'],
        }),

        getCommentsLikes: builder.query<GetLikesResponse, GetCommentLikesRequest>({
            query: ({ postId, commentId, cursor, pageNumber, pageSize, search }) => ({
                url: `api/v1/posts/${postId}/comments/${commentId}/likes`,
                params: { cursor, pageNumber, pageSize, search },
            }),
            providesTags: ['Comment'],
        }),

        getCommentsForUnauthorizedUsers: builder.query<
            GetCommentsForUnauthorizedUsersResponse,
            GetCommentsForUnauthorizedUsersRequest
        >({
            query: ({ pageNumber, pageSize, postId, sortBy, sortDirection }) => ({
                url: `/api/v1/public-posts/${postId}/comments`,
                params: { pageNumber, pageSize, sortBy, sortDirection },
            }),
            providesTags: ['Comment'],
        }),

        // CREATE

        createComment: builder.mutation<CommentType, CreateCommentRequest>({
            query: ({ content, postId }) => ({
                url: `/api/v1/posts/${postId}/comments`,
                method: 'POST',
                body: { content },
            }),
            invalidatesTags: [{ type: 'Comment' }],
        }),

        createAnswerComment: builder.mutation<CommentType, CreateAnswerRequest>({
            query: ({ commentId, content, postId }) => ({
                url: `/api/v1/posts/${postId}/comments/${commentId}/answers`,
                body: { content },
            }),
            invalidatesTags: [{ type: 'Comment' }],
        }),

        // PUT

        updateLikeStatusAnswer: builder.mutation<void, UpdateLikeStatusAnswerRequest>({
            query: ({ answerId, commentId, likeStatus, postId }) => ({
                url: `/api/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
                method: 'PUT',
                body: { likeStatus },
            }),
            invalidatesTags: [{ type: 'Comment' }],
        }),

        updateLikeStatusComment: builder.mutation<void, UpdateLikeStatusCommentRequest>({
            query: ({ commentId, postId, likeStatus }) => ({
                url: `/api/v1/posts/${postId}/comments/${commentId}/like-status`,
                method: 'PUT',
                body: { likeStatus },
            }),
            invalidatesTags: [{ type: 'Comment' }],
        }),

        // DELETE
    }),
});

export const {
    useGetCommentQuery,
    useGetAnswersQuery,
    useGetAnswerLikesQuery,
    useGetCommentsLikesQuery,
    useGetCommentsForUnauthorizedUsersQuery,
    useCreateCommentMutation,
    useCreateAnswerCommentMutation,
    useUpdateLikeStatusAnswerMutation,
    useUpdateLikeStatusCommentMutation,
} = commentApi;
