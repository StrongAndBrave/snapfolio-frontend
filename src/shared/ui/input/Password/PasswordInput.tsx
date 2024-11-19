import React, { useState, ComponentPropsWithRef } from 'react';
import s from './../Input.module.scss';
import { EyeOnIcon } from './icons/EyeOnIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';

type Props = {
    error?: string;
    label?: string;
} & ComponentPropsWithRef<'input'>;

export const PasswordInput = ({ error, disabled, label, ...rest }: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const currentType = isVisible ? 'text' : 'password';

    const handleChangeCurrentType = () => {
        setIsVisible(!isVisible);
    };

    const eyeIcon = isVisible ? <EyeOnIcon /> : <EyeOffIcon />;

    return (
        <div className={`${s.inputWrapper} ${disabled ? s.disabled : ''}`}>
            <label className={s.label}>{label}</label>

            <div className={s.inputContainer}>
                <input
                    type={currentType}
                    className={` 
                        ${s.inputField} 
                        ${error ? s.error : ''} 
                        ${s.passwordInput}`}
                    {...rest}
                />
                <div className={s.eyeIcon} onClick={handleChangeCurrentType}>
                    {eyeIcon}
                </div>
            </div>

            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};
