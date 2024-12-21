import React, { ComponentPropsWithRef } from 'react';
import styles from './Input.module.scss';

type InputTypes = 'email' | 'text';

type Props = {
    type: InputTypes;
    error?: string;
    label?: string;
} & ComponentPropsWithRef<'input'>;

export const Input = ({ type, error, disabled, label, className, ...rest }: Props) => {
    return (
        <div className={`${styles.inputWrapper}  ${className} ${disabled && styles.disabled}`}>
            {label && <label className={styles.label}>{label}</label>}

            <div className={styles.inputContainer}>
                <input type={type} className={`${styles.inputField} ${error && styles.error}`} {...rest} />
            </div>

            <div className={styles.errorMessage}>{error && error}</div>
        </div>
    );
};
