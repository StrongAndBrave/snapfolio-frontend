import React, { ComponentPropsWithRef } from 'react';
import styles from './Checkbox.module.scss';

type Props = {
    children?: React.ReactNode;
} & Omit<ComponentPropsWithRef<'input'>, 'value'>;

export const Checkbox = ({ children, ...rest }: Props) => {
    return (
        <label className={styles.label}>
            <input type="checkbox" className={styles.input} {...rest} />
            <span className={styles.fake}></span>
            {children && <span className={styles.text}>{children}</span>}
        </label>
    );
};