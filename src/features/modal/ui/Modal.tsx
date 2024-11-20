import { useEffect, useState, useCallback, useRef, ReactNode } from 'react';

import { createContainer, Portal } from '@/features/portal';
import styles from './Modal.module.scss';

const MODAL_CONTAINER_ID = 'modal-container-id';

type Props = {
    onClose?: () => void;
    id?: string;
    title?: string;
    children: ReactNode;
};

export const Modal = ({ onClose, id = MODAL_CONTAINER_ID, title, children }: Props) => {
    const [isMounted, setMounted] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        createContainer({ id });
        setMounted(true);
    }, [id]);

    useEffect(() => {
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose?.();
            }
        };

        window.addEventListener('keydown', handleEscapePress);

        return () => {
            window.removeEventListener('keydown', handleEscapePress);
        };
    }, [onClose]);

    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return isMounted ? (
        <Portal id={id}>
            <div className={styles.wrapper} ref={rootRef} onClick={handleClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={styles.header}>
                        {title ? <h3 className={styles.title}>{title}</h3> : ''}
                        <button type="button" className={styles['button-close']} onClick={handleClose} />
                    </div>
                    <div className={styles.content}>{children}</div>
                </div>
            </div>
        </Portal>
    ) : null;
};
