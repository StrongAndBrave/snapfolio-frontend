import { useGetPostsByUserIdQuery, useGetPublicPostByIdQuery } from '@/features/posts/api/postsApi';

export const useProfilePosts = (userId: number, visiblePosts: number) => {
    const postsQuery = useGetPostsByUserIdQuery(
        {
            userId,
            endCursorPostId: 0,
            pageSize: visiblePosts,
            sortBy: 'createdAt',
            sortDirection: 'desc',
        },
        { skip: !userId },
    );

    return postsQuery;
};
