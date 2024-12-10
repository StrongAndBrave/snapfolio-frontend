import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import Link from 'next/link';
import styles from './ButtonUI.module.scss';
import Image from 'next/image';

type LinkPropsType = {
    as: typeof Link;
    href: string;
};

type Props<T extends ElementType> = {
    as?: T;
    children?: ReactNode;
    src?: string;
    alt?: string;
    isNoMobileText?: boolean;
} & (T extends typeof Link ? LinkPropsType : ComponentPropsWithoutRef<'button'>);

export const ButtonUI = <T extends ElementType | typeof Link = 'button'>({
    as,
    children,
    src,
    alt,
    isNoMobileText,
    ...props
}: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
    const Component = (as || 'button') as ElementType;
    return (
        <Component className={src ? styles['with-icon'] : styles.link} {...props}>
            {src && <Image src={src} alt={alt || 'icon'} className={styles.icon} />}
            {children && <span className={isNoMobileText ? styles.text : ''}>{children}</span>}
        </Component>
    );
};