import React from 'react';
import Image from 'next/image';
import styles from './PublicPosts.module.scss';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';
import { PostType } from '@/features/posts/api/types/postTypes';
import { getTimeAgo } from '@/shared/ui/time-utils';

export const PostDescription = ({ post }: { post: PostType }) => (
    <div className={styles.comment}>
        <Image
            src={post.avatarOwner || DEFAULT_AVATAR}
            width={36}
            height={36}
            alt={`${post.userName} avatar`}
            className={styles.commentAvatar}
        />
        <div className={styles.commentContent}>
            <p>
                <strong>{post.userName}</strong>
                {post.description}
            </p>
            <small>{getTimeAgo(new Date(post.createdAt))}</small>
        </div>
    </div>
);
