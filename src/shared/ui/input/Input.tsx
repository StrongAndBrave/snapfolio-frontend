import React, { ComponentPropsWithRef } from 'react';
import s from './Input.module.scss';

type InputTypes = 'email' | 'text';

type Props = {
    type: InputTypes;
    error?: string;
    label?: string;
} & ComponentPropsWithRef<'input'>;

export const Input = ({ type, error, disabled, label, ...rest }: Props) => {
    return (
        <div className={`${s.inputWrapper} ${disabled ? s.disabled : ''}`}>
            {label && <label className={s.label}>{label}</label>}

            <div className={s.inputContainer}>
                <input type={type} className={`${s.inputField} ${error ? s.error : ''}  `} {...rest} />
            </div>

            <div className={s.errorMessage}>{error ? error : ''}</div>
        </div>
    );
};
