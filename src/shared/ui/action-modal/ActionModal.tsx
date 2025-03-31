'use client';
import { Modal } from '@/shared/ui';
import styles from './ActionModal.module.scss';

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
    onCloseAction: () => void;
    title: string;
    className?: string;
};

export const ActionModal = ({ isOpen, onCloseAction, children, title, className }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            className={className && className}
            onCloseAction={onCloseAction}
            modalId={'modal-action'}
        >
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                <button className={styles.closeButton} onClick={onCloseAction}>
                    &times;
                </button>
            </div>
            <div className={styles.content}>{children}</div>
        </Modal>
    );
};
