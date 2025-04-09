import React from 'react';
import Image from 'next/image';
import styles from './Comment.module.scss';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';
import { CommentType } from '@/features/posts/api/types/commentsTypes';
import { CommentAnswers } from '@/features/posts/ui/view-post/comment/CommentAnswers';
import { getTimeAgo } from '@/shared/ui';

type Props = {
    comment: CommentType;
    postId: number;
    isExpanded: boolean;
    onToggle: () => void;
};

export const Comment = React.memo(({ comment, postId, isExpanded, onToggle }: Props) => (
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
));
