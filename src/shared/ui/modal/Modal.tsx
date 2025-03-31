'use client';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { useEffect } from 'react';

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    className?: string
    modalId?: string
};

export const Modal = ({ isOpen, children, onClose, className, modalId}: Props) => {
     const modal = document.getElementById(modalId ? modalId : 'modal-root');

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

    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modal} ${className}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        modal || document.body,
    );
};
