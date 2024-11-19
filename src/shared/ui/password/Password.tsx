'use client';

import React, { useState, ComponentPropsWithRef } from 'react';
import s from './../input/Input.module.scss';
import { EyeOnIcon } from './icons/EyeOnIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';

type Props = {
    error?: string;
} & ComponentPropsWithRef<'input'>;

export const Password = ({ error, disabled, ...rest }: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleChangeCurrentType = () => {
        setIsVisible(!isVisible);
    };

    const currentType = isVisible ? 'text' : 'password';
    const eyeIcon = isVisible ? <EyeOnIcon /> : <EyeOffIcon />;

    return (
        <div className={`${s.inputWrapper} ${disabled ? s.disabled : ''}`}>
            <label className={s.label}>Password</label>

            <div className={s.inputContainer}>
                <input
                    type={currentType}
                    className={` 
                        ${s.inputField} 
                        ${error ? s.error : ''} 
                        ${s.passwordInput}`}
                    placeholder="Password"
                    {...rest}
                />
                <div className={s.eyeIcon} onClick={handleChangeCurrentType}>
                    {eyeIcon}
                </div>
            </div>

            {<div className={s.errorMessage}>{error ? error : ''}</div>}
        </div>
    );
};
