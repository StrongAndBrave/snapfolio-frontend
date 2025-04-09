'use client';
import { useState } from 'react';
import styles from './PublicPosts.module.scss';

import { Modal } from '@/shared/ui';
import Image from 'next/image';
import { PostModalContent } from '@/features/posts/ui/view-post/modal/PostModalContent';
import { useGetAllPostsQuery, useGetPostByIdQuery } from '@/features/posts/api/postsApi';
import { useGetCommentsForUnauthorizedUsersQuery } from '@/features/posts/api/commentsApi';

export const PublicPosts = () => {
    const [openedPostId, setOpenedPostId] = useState<number | null>(null);

    const { data: allPosts, isLoading: isPostsLoading } = useGetAllPostsQuery({
        endCursorPostId: 0,
        pageSize: 10,
        sortBy: 'createdAt',
        sortDirection: 'desc',
    });

    const { data: currentPost, isLoading: isPostLoading } = useGetPostByIdQuery(
        { postId: openedPostId! },
        { skip: !openedPostId },
    );

    const { data: postComments, isLoading: isCommentsLoading } = useGetCommentsForUnauthorizedUsersQuery(
        {
            postId: openedPostId!,
            pageNumber: 1,
            pageSize: 10,
            sortBy: 'createdAt',
            sortDirection: 'desc',
        },
        { skip: !openedPostId },
    );

    if (isPostsLoading) {
        return <div>Загрузка постов...</div>;
    }

    return (
        <div className={styles.profilePage}>
            <h1>Profile Page</h1>
            <div className={styles.postsGrid}>
                {allPosts?.items.map(post => (
                    <Image
                        key={post.id}
                        src={post.images[0].url}
                        alt="Post"
                        width={1}
                        height={1}
                        onClick={() => setOpenedPostId(post.id)}
                    />
                ))}
            </div>
            {currentPost && (
                <Modal
                    isOpen={Boolean(openedPostId)}
                    className={styles.postModal}
                    onClose={() => setOpenedPostId(null)}
                >
                    <PostModalContent postId={openedPostId!} />
                </Modal>
            )}
        </div>
    );
};
