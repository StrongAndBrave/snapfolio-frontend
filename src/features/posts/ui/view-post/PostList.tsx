'use client';
import React from 'react';
import styles from './PublicPosts.module.scss';
import { useGetAllPostsQuery } from '@/features/posts/api/postsApi';
import { PostCard } from '@/features/posts/ui/view-post/PostCard';

export const PostList: React.FC = () => {
    // pageSize: количество постов на главной
    const { data, isLoading, isError } = useGetAllPostsQuery(
        {
            endCursorPostId: 0,
            pageSize: 12,
            sortBy: 'createdAt',
            sortDirection: 'desc',
        },
        {
            pollingInterval: 60000,
        },
    );

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isError) {
        return <div>Ошибка загрузки постов</div>;
    }

    return (
        <section className={styles['post-list']}>
            {data?.items.map(post => <PostCard key={post.id} post={post} />)}
        </section>
    );
};
