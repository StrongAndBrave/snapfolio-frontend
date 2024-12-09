'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

type Props = {
    children: ReactNode;
    show: boolean;
    onClose?: () => void;
    selector: string;
    header?: string;
    className?: string;
    needHeaderBtn?: boolean;
};
export const Modal = ({ children, show, onClose, selector, header, className, needHeaderBtn = true }: Props) => {
    const [mounted, setMounted] = useState(false);
    const ref = useRef<Element | null>(null);

    useEffect(() => {
        ref.current = document.getElementById(selector);
        setMounted(true);
    }, [selector]);

    if (!mounted || !ref.current) {
        return null;
    };

    return show
        ? createPortal(
            <div className={styles.overflow}>
                <div className={styles.modal}>
                    <header className={`${styles.header} ${className ? styles[className] : ''}`}>
                        {header && (
                            <h1 className={`${styles.title} ${header === 'Error' && styles.error}`}>{header}</h1>
                        )}
                        {needHeaderBtn && <button onClick={onClose} className={styles.close}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                                    fill="white"
                                />
                            </svg>
                        </button>}
                    </header>
                    <div className={styles.content}>{children}</div>
                </div>
            </div>,
            ref.current,
        )
        : null;
};
