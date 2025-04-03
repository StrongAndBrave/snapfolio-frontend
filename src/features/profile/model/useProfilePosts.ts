import { useGetPostsByUserIdQuery } from '@/features/posts/api/postsApi';

export const useProfilePosts = (userId: number, visiblePosts: number) => {
    return useGetPostsByUserIdQuery(
        {
            userId,
            endCursorPostId: 0,
            pageSize: visiblePosts,
            sortBy: 'createdAt',
            sortDirection: 'desc',
        },
        { skip: !userId },
    );
};
