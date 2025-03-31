import React from 'react';
import styles from './PublicPosts.module.scss';
import { mockData } from '@/features/public-posts/api/getMockData';
import { PostCard } from '@/features/public-posts/ui/PostCard';

export const PostList: React.FC = () => {
    return (
        <section className={styles['post-list']}>
            {mockData.items.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </section>
    );
};
