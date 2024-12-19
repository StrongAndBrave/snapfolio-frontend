import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import styles from './ImgBtn.module.scss';
import Link from 'next/link';

type Props<T extends ElementType | typeof Link> = {
    icon: ReactNode;
    as?: T;
};

export const ImgBtn = <T extends ElementType | typeof Link = 'button'>({
    icon,
    as,
    className,
    children,
    ...rest
}: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
    const Component = as || 'button';

    return (
        <Component className={`${styles.imgBtn} ${className}`} {...rest}>
            {icon} {children && <span className={styles.text}>{children}</span>}
        </Component>
    );
};
