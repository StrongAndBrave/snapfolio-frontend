import { ActionModal, Button } from '@/shared/ui';
import styles from './PostModal.module.scss';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export const EditPostModal = ({ isOpen, onClose, onConfirm }: Props) => (
    <ActionModal isOpen={isOpen} title="Close Post" onClose={onClose} className={styles.modalEditPost}>
        <span>Do you really want to close the edition of the publication? If you close changes won’t be saved</span>
        <div className={styles.modalEditPostButton}>
            <Button onClick={onConfirm} variant={'outlined'}>
                Yes
            </Button>
            <Button onClick={onClose} variant={'contained'}>
                No
            </Button>
        </div>
    </ActionModal>
);
