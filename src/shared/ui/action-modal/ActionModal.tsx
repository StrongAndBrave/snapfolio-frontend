'use client';
import { Modal } from '@/shared/ui';
import styles from './ActionModal.module.scss';

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    title: string;
    className?: string;
};

export const ActionModal = ({ isOpen, onClose, children, title, className }: Props) => {
    return (
        <Modal isOpen={isOpen} className={className && className} onClose={onClose} modalId={'modal-action'}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
            </div>
            <div className={styles.content}>{children}</div>
        </Modal>
    );
};
