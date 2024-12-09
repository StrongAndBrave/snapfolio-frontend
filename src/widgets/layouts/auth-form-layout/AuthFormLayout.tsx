import { BtnAuth, Button } from '@/shared/ui';
import styles from './AuthFormLayout.module.scss';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

type Props = {
    title: string;
    text?: string;
    alternativeBtn?: string;
    hrefAltBtn?: string;
    className?: string;
};

export const AuthFormLayout = ({
    title,
    text,
    alternativeBtn,
    hrefAltBtn,
    className,
    children,
}: PropsWithChildren<Props>) => {
    return (
        <div className={`${styles.wrapper} ${className ? styles.className : ''}`}>
            <h1 className={styles.title}>{title}</h1>
            {!(className === 'forgot') && (
                <div className={styles['auth-btns']}>
                    <BtnAuth label="google" type="button" />
                    <BtnAuth label="github" type="button" />
                </div>
            )}
            {children}
            {alternativeBtn && hrefAltBtn && (
                <div>
                    {text && <p className={styles['sign-text']}>{text}</p>}
                    <Button variant="text" fullWidth as={Link} href={hrefAltBtn}>
                        {alternativeBtn}
                    </Button>
                </div>
            )}
        </div>
    );
};
