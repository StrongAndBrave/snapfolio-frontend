'use client';
import React, { useState, useCallback } from 'react';
import styles from './PublicPosts.module.scss';
import Image from 'next/image';
import { getTimeAgo } from '@/shared/ui/time-utils';
import { PhotoSlider } from '@/shared/ui';
import { useDeletePostByIdMutation, useGetPublicPostByIdQuery } from '@/features/posts/api/postsApi';
import { useGetCommentsForUnauthorizedUsersQuery } from '@/features/posts/api/commentsApi';
import { PostType } from '@/features/posts/api/types/postTypes';
import { CommentType } from '@/features/posts/api/types/commentsTypes';
import { useAppSelector } from '@/app/store/store';
import { useMeQuery } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import { PostDescription } from './PostDescription';
import { Comment } from './CommentPost';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';
import { PostActionsMenu } from '@/features/posts/ui/view-post/PostActionsMenu';
import { DeletePostModal } from '@/features/posts/ui/view-post/DeletePostModal';

type Props = {
    postId: number;
    postData?: PostType;
    comments?: CommentType[];
    onClose?: () => void;
};

export const PostModalContent = ({ postId, postData, comments, onClose }: Props) => {
    const router = useRouter();
    const isAutorized = useAppSelector(state => state.auth.isAuthorized);
    const { data: user } = useMeQuery(undefined, { skip: !isAutorized });

    const { data: post, isLoading: isPostLoading } = useGetPublicPostByIdQuery({ postId }, { skip: !!postData });

    const { data: commentsData, isLoading: isCommentsLoading } = useGetCommentsForUnauthorizedUsersQuery(
        { postId, pageSize: 100, pageNumber: 1, sortBy: 'createdAt', sortDirection: 'desc' },
        { skip: !!comments },
    );

    const [deletePost] = useDeletePostByIdMutation();
    const [expandedCommentIds, setExpandedCommentIds] = useState<number[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const currentPost = postData || post;
    const currentComments = comments || commentsData?.items;
    const isCurrentUserOwner = isAutorized && user?.userId === currentPost?.ownerId;

    const toggleAnswers = useCallback((commentId: number) => {
        setExpandedCommentIds(prev =>
            prev.includes(commentId) ? prev.filter(id => id !== commentId) : [...prev, commentId],
        );
    }, []);

    const handleEditClick = useCallback(() => {
        console.log('Edit post', currentPost?.id);
    }, [currentPost]);

    const handleDeleteClick = useCallback(() => {
        setIsDeleteModalOpen(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (!currentPost) return;

        setIsDeleting(true);
        try {
            await deletePost({ postId: currentPost.id }).unwrap();
            setIsDeleteModalOpen(false);
            onClose ? onClose() : router.back();
        } catch (error) {
            console.error('Ошибка при удалении поста: ', error);
        } finally {
            setIsDeleting(false);
        }
    }, [currentPost, deletePost, onClose, router]);

    if (!currentPost || !currentComments || isPostLoading || isCommentsLoading) {
        return <div>Загрузка данных...</div>;
    }

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
                    {isCurrentUserOwner && <PostActionsMenu onEdit={handleEditClick} onDelete={handleDeleteClick} />}
                </div>

                <div className={styles.commentsSection}>
                    <PostDescription post={currentPost} />

                    {currentComments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            postId={postId}
                            isExpanded={expandedCommentIds.includes(comment.id)}
                            onToggle={() => toggleAnswers(comment.id)}
                        />
                    ))}
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
            <DeletePostModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </>
    );
};
