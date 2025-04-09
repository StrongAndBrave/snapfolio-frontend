'use client';
import styles from './PostModal.module.scss';
import Image from 'next/image';
import { getTimeAgo } from '@/shared/ui/time-utils';
import { Button, PhotoSlider } from '@/shared/ui';
import { useGetPublicPostByIdQuery } from '@/features/posts/api/postsApi';
import { useGetCommentsForUnauthorizedUsersQuery } from '@/features/posts/api/commentsApi';
import { PostType } from '@/features/posts/api/types/postTypes';
import { CommentType } from '@/features/posts/api/types/commentsTypes';
import { useAppSelector } from '@/app/store/store';
import { useMeQuery } from '@/features/auth/api/authApi';
import { PostDescription } from '../comment/PostDescription';
import { Comment } from '@/features/posts/ui/view-post/comment/Comment';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';
import { PostActionsMenu } from '@/features/posts/ui/view-post/PostActionsMenu';
import { DeletePostModal } from '@/features/posts/ui/view-post/modal/DeletePostModal';
import { EditPostModal } from '@/features/posts/ui/view-post/modal/EditPostModal';
import { usePostActions } from '@/features/posts/model/usePostActions';
import { useComments } from '@/features/posts/model/useCommnets';

type Props = {
    postId: number;
    postData?: PostType;
    comments?: CommentType[];
    onClose?: () => void;
};

export const PostModalContent = ({ postId, postData, comments = [], onClose }: Props) => {
    const isAutorized = useAppSelector(state => state.auth.isAuthorized);
    const { data: user } = useMeQuery(undefined, { skip: !isAutorized });

    const { data: post, isLoading: isPostLoading } = useGetPublicPostByIdQuery({ postId }, { skip: !!postData });
    const { data: commentsData, isLoading: isCommentsLoading } = useGetCommentsForUnauthorizedUsersQuery(
        { postId, pageSize: 100, pageNumber: 1, sortBy: 'createdAt', sortDirection: 'desc' },
        { skip: !!comments },
    );

    const currentPost = postData || post;
    const currentComments = comments || commentsData?.items;
    const isCurrentUserOwner = isAutorized && user?.userId === currentPost?.ownerId;

    const {
        isEditing,
        isEditModalOpen,
        editedDescription,
        isDeleteModalOpen,
        isDeleting,
        remainingChars,
        isNearLimit,
        handleEditClick,
        handleDescriptionChange,
        handleSaveChanges,
        handleCancelEditClick,
        handleConfirmEdit,
        handleDeleteClick,
        handleConfirmDelete,
        setIsEditModalOpen,
        setIsDeleteModalOpen,
        maxLength,
    } = usePostActions(currentPost, onClose);

    const { expandedCommentIds, toggleAnswers } = useComments();

    if (!currentPost || !currentComments || isPostLoading || isCommentsLoading) {
        return <div>Загрузка данных...</div>;
    }

    return (
        <div className={`${styles.postModalContent} ${isEditing ? styles.editMode : ''}`}>
            {isEditing && (
                <div className={styles.editHeader}>
                    <span>Edit post</span>
                    <Button onClick={handleCancelEditClick} className={styles.closeEditButton}>
                        ×
                    </Button>
                </div>
            )}
            <div className={styles.postImage}>
                <PhotoSlider images={currentPost.images.map(img => img.url)} />
            </div>

            <div className={styles.postContent}>
                {!isEditing && (
                    <div className={styles.postOwner}>
                        <Image
                            src={currentPost.avatarOwner || DEFAULT_AVATAR}
                            width={36}
                            height={36}
                            alt={`${currentPost.userName} avatar`}
                            className={styles.commentAvatar}
                        />
                        <strong>{currentPost.userName}</strong>
                        {isCurrentUserOwner && (
                            <PostActionsMenu onEdit={handleEditClick} onDelete={handleDeleteClick} />
                        )}
                    </div>
                )}

                <div className={styles.commentsSection}>
                    {isEditing ? (
                        <div className={styles.editDescription}>
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
                            <span>Add publication descriptions</span>
                            <textarea
                                value={editedDescription}
                                onChange={handleDescriptionChange}
                                className={styles.editTextarea}
                                rows={4}
                                maxLength={maxLength}
                            />
                            <div className={styles.charCounter}>
                                <span className={isNearLimit ? styles.warning : ''}>
                                    {remainingChars}/{maxLength}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <PostDescription post={currentPost} />
                    )}

                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            postId={postId}
                            isExpanded={expandedCommentIds.includes(comment.id)}
                            onToggle={() => toggleAnswers(comment.id)}
                        />
                    ))}
                </div>
                {!isEditing && (
                    <>
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
                    </>
                )}
                {isEditing && (
                    <div className={styles.saveChangesContainer}>
                        <Button onClick={handleSaveChanges} className={styles.saveButton} variant={'outlined'}>
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>
            <EditPostModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onConfirm={handleConfirmEdit}
            />
            <DeletePostModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
};
