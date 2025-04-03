import React from 'react';
import Image from 'next/image';
import styles from './PublicPosts.module.scss';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';
import { CommentType } from '@/features/posts/api/types/commentsTypes';
import { CommentAnswers } from '@/features/posts/ui/view-post/CommentAnswers';
import { getTimeAgo } from '@/shared/ui';

export const Comment = ({
    comment,
    postId,
    isExpanded,
    onToggle,
}: {
    comment: CommentType;
    postId: number;
    isExpanded: boolean;
    onToggle: () => void;
}) => (
    <div className={styles.comment}>
        <Image
            src={comment.from.avatars[0]?.url || DEFAULT_AVATAR}
            alt={comment.from.username}
            width={36}
            height={36}
            className={styles.commentAvatar}
        />
        <div className={styles.commentContent}>
            <p>
                <strong>{comment.from.username}</strong>
                {comment.content}
            </p>
            <small>{getTimeAgo(new Date(comment.createdAt))}</small>
            {comment.answerCount > 0 && !isExpanded && (
                <div className={styles.viewMore} onClick={onToggle}>
                    <p>View Answers</p>
                </div>
            )}
            {isExpanded && <CommentAnswers postId={postId} commentId={comment.id} />}
        </div>
    </div>
);
