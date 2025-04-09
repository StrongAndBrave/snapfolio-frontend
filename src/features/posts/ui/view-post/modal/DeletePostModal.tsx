'use client';
import { ActionModal, Button } from '@/shared/ui';
import styles from './PostModal.module.scss';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
};

export const DeletePostModal = ({ isOpen, onClose, onConfirm, isDeleting }: Props) => (
    <ActionModal isOpen={isOpen} title="Delete Post" onClose={onClose} className={styles.modalDeletePost}>
        Are you sure you want to delete this post?
        <div className={styles.modalDeletePostButton}>
            <Button onClick={onConfirm} variant={'outlined'}>
                Yes
            </Button>
            <Button onClick={onClose} disabled={isDeleting} variant={'outlined'}>
                No
            </Button>
        </div>
    </ActionModal>
);
