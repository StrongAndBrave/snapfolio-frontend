'use client';

import React, { useState, ComponentPropsWithRef } from 'react';
import styles from './../input/Input.module.scss';
import { EyeOnIcon } from './icons/EyeOnIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';

type Props = {
    error?: string;
    label?: string;
} & ComponentPropsWithRef<'input'>;

export const Password = ({ error, disabled, label, placeholder, className, ...rest }: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleChangeCurrentType = () => {
        setIsVisible(!isVisible);
    };

    const currentType = isVisible ? 'text' : 'password';
    const eyeIcon = isVisible ? <EyeOnIcon /> : <EyeOffIcon />;

    return (
        <div className={`${styles.inputWrapper} ${className} ${disabled && styles.disabled}`}>
            <label className={styles.label}> {label || 'Password'}</label>

            <div className={styles.inputContainer}>
                <input
                    type={currentType}
                    className={` 
                        ${styles.inputField} 
                        ${error && styles.error} 
                        ${styles.passwordInput}`}
                    placeholder={placeholder}
                    {...rest}
                />
                <div className={styles.eyeIcon} onClick={handleChangeCurrentType}>
                    {eyeIcon}
                </div>
            </div>

            {<div className={styles.errorMessage}>{error && error}</div>}
        </div>
    );
};
