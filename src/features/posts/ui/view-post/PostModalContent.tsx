'use client';
import React, { useState } from 'react';
import styles from './PublicPosts.module.scss';
import Image from 'next/image';
import { getTimeAgo } from '@/shared/ui/time-utils';
import { PhotoSlider } from '@/shared/ui';
import { useGetPublicPostByIdQuery } from '@/features/posts/api/postsApi';
import { useGetCommentsForUnauthorizedUsersQuery } from '@/features/posts/api/commentsApi';
import { PostType } from '@/features/posts/api/types/postTypes';
import { CommentType } from '@/features/posts/api/types/commentsTypes';
import { CommentAnswers } from '@/features/posts/ui/view-post/CommentAnswers';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';

type Props = {
    postId: number;
    postData?: PostType;
    comments?: CommentType[];
};

export const PostModalContent = ({ postId, postData, comments }: Props) => {
    const { data: post, isLoading: isPostLoading } = useGetPublicPostByIdQuery({ postId }, { skip: !!postData });

    const { data: commentsData, isLoading: isCommentsLoading } = useGetCommentsForUnauthorizedUsersQuery(
        {
            postId,
            pageSize: 100,
            pageNumber: 1,
            sortBy: 'createdAt',
            sortDirection: 'desc',
        },
        { skip: !!comments },
    );

    const [expandedCommentIds, setExpandedCommentIds] = useState<number[]>([]);

    const currentPost = postData || post;
    const currentComments = comments || commentsData?.items;

    if (!currentPost || !currentComments) {
        return <div>Загрузка данных...</div>;
    }

    const toggleAnswers = (commentId: number) => {
        setExpandedCommentIds(prev =>
            prev.includes(commentId) ? prev.filter(id => id !== commentId) : [...prev, commentId],
        );
    };

    return (
        <>
            <div className={styles.postImage}>
                <PhotoSlider images={currentPost.images.map(img => img.url)} />
            </div>

            <div className={styles.postContent}>
                <div className={styles.postOwner}>
                    <Image
                        src={currentPost.avatarOwner || DEFAULT_AVATAR}
                        width={36}
                        height={36}
                        alt={`${currentPost.userName} avatar`}
                        className={styles.commentAvatar}
                    />
                    <strong>{currentPost.userName}</strong>
                </div>

                <div className={styles.commentsSection}>
                    <div className={styles.comment}>
                        <Image
                            src={currentPost.avatarOwner || DEFAULT_AVATAR}
                            width={36}
                            height={36}
                            alt={`${currentPost.userName} avatar`}
                            className={styles.commentAvatar}
                        />
                        <div className={styles.commentContent}>
                            <p>
                                <strong>{currentPost.userName}</strong>
                                {currentPost.description}
                            </p>
                            <small>{getTimeAgo(new Date(currentPost.createdAt))}</small>
                        </div>
                    </div>

                    {currentComments.map(comment => {
                        const isExpanded = expandedCommentIds.includes(comment.id);
                        const hasAnswers = comment.answerCount > 0;

                        return (
                            <div key={comment.id} className={styles.comment}>
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

                                    {hasAnswers && !isExpanded && (
                                        <div className={styles.viewMore} onClick={() => toggleAnswers(comment.id)}>
                                            <p>View Answers</p>
                                        </div>
                                    )}

                                    {isExpanded && <CommentAnswers postId={postId} commentId={comment.id} />}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={styles.postInformation}>
                    {currentPost.likesCount > 0 && (
                        <div className={styles.avatarsWhoLikes}>
                            {Array.isArray(currentPost.avatarWhoLikes) &&
                                currentPost.avatarWhoLikes?.map((avatar, index) => (
                                    <Image
                                        key={index}
                                        src={avatar}
                                        alt={`User ${index}`}
                                        width={1}
                                        height={1}
                                        className={styles.avatarWhoLikes}
                                    />
                                ))}
                        </div>
                    )}
                    <span className={styles.postLikes}>
                        {currentPost.likesCount.toLocaleString('ru-Ru')} <strong>"Like"</strong>
                    </span>
                </div>

                <div className={styles.postDate}>
                    <small>{getTimeAgo(new Date(currentPost.createdAt))}</small>
                </div>
            </div>
        </>
    );
};
