import {ActionModal, Button} from "@/shared/ui";
import styles from './ExitModal.module.scss'

type Props = {
    clearCreatePost: ()=> void;
    onClose: () => void;
    isOpen: boolean;
}

export const CreatePostExitModal = ({clearCreatePost, onClose, isOpen}:Props) => {
    return (
        <ActionModal className={styles.modal} onClose={onClose} isOpen={isOpen} title={'Сlose'} >
            <span>Do you really want to close the creation of a publication?<br/>If you close everything will be deleted</span>
            <div className={styles.btnContainer}>
                <Button onClick={clearCreatePost} className={styles.button} variant={'outlined'}>Yes</Button>
                <Button onClick={onClose} className={styles.button} variant={'contained'}>No</Button>
            </div>
        </ActionModal>
    );
};