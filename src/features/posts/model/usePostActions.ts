import { useState, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { PostType } from '@/features/posts/api/types/postTypes';
import { useUpdatePostByIdMutation, useDeletePostByIdMutation } from '@/features/posts/api/postsApi';

export const usePostActions = (post: PostType | undefined, onClose?: () => void) => {
    const router = useRouter();
    const [updatePost] = useUpdatePostByIdMutation();
    const [deletePost] = useDeletePostByIdMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedDescription, setEditedDescription] = useState(post?.description || '');
    const maxLength = 500;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const remainingChars = maxLength - editedDescription.length;
    const isNearLimit = remainingChars < 20;

    const handleEditClick = useCallback(() => {
        if (post) {
            setEditedDescription(post.description);
            setIsEditing(true);
        }
    }, [post]);

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= maxLength) {
            setEditedDescription(e.target.value);
        }
    };

    const handleSaveChanges = async () => {
        if (!post) return;

        try {
            await updatePost({
                postId: post.id,
                description: editedDescription,
            }).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка при обновлении поста: ', error);
        }
    };

    const handleCancelEditClick = () => {
        if (editedDescription !== post?.description) {
            setIsEditModalOpen(true);
        } else {
            setIsEditing(false);
        }
    };

    const handleConfirmEdit = () => {
        setIsEditModalOpen(false);
        setIsEditing(false);
    };

    const handleDeleteClick = useCallback(() => {
        setIsDeleteModalOpen(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (!post) return;

        setIsDeleting(true);
        try {
            await deletePost({ postId: post.id }).unwrap();
            setIsDeleteModalOpen(false);
            onClose ? onClose() : router.back();
        } catch (error) {
            console.error('Ошибка при удалении поста: ', error);
        } finally {
            setIsDeleting(false);
        }
    }, [post, deletePost, onClose, router]);

    return {
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
        setEditedDescription,
        setIsEditing,
        setIsEditModalOpen,
        setIsDeleteModalOpen,
        maxLength,
    };
};
