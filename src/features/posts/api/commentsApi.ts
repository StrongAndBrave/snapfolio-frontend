import { baseApi } from '@/shared/api/baseApi';
import {
    CommentType,
    CreateAnswerRequest,
    CreateCommentRequest,
    GetAnswerLikesRequest,
    GetAnswersRequest,
    GetAnswersResponse,
    GetCommentLikesRequest,
    GetCommentsRequest,
    GetCommentsResponse,
    GetLikesResponse,
    UpdateLikeStatusAnswerRequest,
    UpdateLikeStatusCommentRequest,
} from './types';

export const commentApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getComment: builder.query<GetCommentsResponse, GetCommentsRequest>({
            query: ({ postId, pageNumber, pageSize, sortBy, sortDirection }) => ({
                url: `/api/v1/${postId}/comments`,
                params: { pageNumber, pageSize, sortBy, sortDirection },
            }),
        }),
        getAnswers: builder.query<GetAnswersResponse, GetAnswersRequest>({
            query: ({ commentId, pageNumber, pageSize, postId, sortBy, sortDirection }) => ({
                url: `/api/v1/posts/${postId}/comments/${commentId}/answers`,
                params: { pageNumber, pageSize, sortBy, sortDirection },
            }),
        }),

        getAnswerLikes: builder.query<GetLikesResponse, GetAnswerLikesRequest>({
            query: ({ postId, answerId, commentId, cursor, pageNumber, pageSize, search }) => ({
                url: `api/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
                params: { cursor, pageNumber, pageSize, search },
            }),
        }),

        getCommentsLikes: builder.query<GetLikesResponse, GetCommentLikesRequest>({
            query: ({ postId, commentId, cursor, pageNumber, pageSize, search }) => ({
                url: `api/v1/posts/${postId}/comments/${commentId}/likes`,
                params: { cursor, pageNumber, pageSize, search },
            }),
        }),

        createComment: builder.mutation<CommentType, CreateCommentRequest>({
            query: ({ content, postId }) => ({
                url: `/api/v1/posts/${postId}/comments`,
                method: 'POST',
                body: { content },
            }),
        }),

        createAnswerComment: builder.mutation<CommentType, CreateAnswerRequest>({
            query: ({ commentId, content, postId }) => ({
                url: `/api/v1/posts/${postId}/comments/${commentId}/answers`,
                body: { content },
            }),
        }),

        updateLikeStatusAnswer: builder.mutation<void, UpdateLikeStatusAnswerRequest>({
            query: ({ answerId, commentId, likeStatus, postId }) => ({
                url: `/api/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
                method: 'PUT',
                body: { likeStatus },
            }),
        }),

        updateLikeStatusComment: builder.mutation<void, UpdateLikeStatusCommentRequest>({
            query: ({ commentId, postId, likeStatus }) => ({
                url: `/api/v1/posts/${postId}/comments/${commentId}/like-status`,
                method: 'PUT',
                body: { likeStatus },
            }),
        }),
    }),
});

export const {
    useGetCommentQuery,
    useGetAnswersQuery,
    useGetAnswerLikesQuery,
    useGetCommentsLikesQuery,
    useCreateCommentMutation,
    useCreateAnswerCommentMutation,
    useUpdateLikeStatusAnswerMutation,
    useUpdateLikeStatusCommentMutation,
} = commentApi;
