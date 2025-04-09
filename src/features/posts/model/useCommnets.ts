'use client';
import { useCallback, useState } from 'react';
import { useGetAnswersQuery } from '@/features/posts/api/commentsApi';
import { AnswerType } from '@/features/posts/api/types/commentsTypes';

export const useComments = () => {
    const [expandedCommentIds, setExpandedCommentIds] = useState<number[]>([]);

    const toggleAnswers = useCallback((commentId: number) => {
        setExpandedCommentIds(prev =>
            prev.includes(commentId) ? prev.filter(id => id !== commentId) : [...prev, commentId],
        );
    }, []);

    return {
        expandedCommentIds,
        toggleAnswers,
    };
};

export const useCommentAnswers = (postId: number, commentId: number) => {
    const { data, isLoading, isError } = useGetAnswersQuery({
        postId,
        commentId,
        pageSize: 10,
        pageNumber: 1,
        sortBy: 'createdAt',
        sortDirection: 'asc',
    });

    return {
        answers: (data?.items as AnswerType[]) || [],
        isLoading,
        isError,
    };
};
