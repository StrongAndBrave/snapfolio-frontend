'use client';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { useEffect } from 'react';

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    title: string;
};

export const Modal = ({ isOpen, onClose, children, title }: Props) => {
    const modal = document.getElementById('modal-root');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <span className={styles.title}>{title}</span>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        modal || document.body,
    );
};
