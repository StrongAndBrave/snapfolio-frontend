'use client';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { useEffect } from 'react';
import { Button } from '@/shared/ui';

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
    onCloseAction: () => void;
    className?: string;
    modalId?: string;
};

export const Modal = ({ isOpen, children, onCloseAction, className, modalId }: Props) => {
    const modal = document.getElementById(modalId ? modalId : 'modal-root');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCloseAction();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onCloseAction]);

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
        <div className={styles.overlay}>
            <div className={`${styles.modal} ${className}`}>
                <Button className={styles.closeButtonModal} onClick={onCloseAction} />
                {children}
            </div>
        </div>,
        modal || document.body,
    );
};

// 'use client';
// import ReactDOM from 'react-dom';
// import styles from './Modal.module.scss';
// import { useEffect } from 'react';
//
// type Props = {
//     isOpen: boolean;
//     children: React.ReactNode;
//     onClose: () => void;
//     title: string;
// };
//
// export const Modal = ({ isOpen, onClose, children, title }: Props) => {
//     const modal = document.getElementById('modal-root');
//
//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.key === 'Escape') {
//                 onClose();
//             }
//         };
//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, [onClose]);
//
//     if (!isOpen) return null;
//     return ReactDOM.createPortal(
//         <div className={styles.overlay} onClick={onClose}>
//             <div className={styles.modal} onClick={e => e.stopPropagation()}>
//                 <div className={styles.header}>
//                     <span className={styles.title}>{title}</span>
//                     <button className={styles.closeButton} onClick={onClose}>
//                         &times;
//                     </button>
//                 </div>
//                 <div className={styles.content}>{children}</div>
//             </div>
//         </div>,
//         modal || document.body,
//     );
// };
