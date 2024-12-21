import React, { ComponentPropsWithRef } from 'react';
import s from './../input/Input.module.scss';
import { LoupeIcon } from './icons/LoupeIcon';

type Props = {
    error?: string;
} & ComponentPropsWithRef<'input'>;

export const Search = ({ error, disabled, placeholder, className, ...rest }: Props) => {
    return (
        <div className={`${s.inputWrapper} ${className} ${disabled ? s.disabled : ''}`}>
            <div className={s.inputContainer}>
                <input
                    type={'search'}
                    className={` 
                        ${s.inputField} 
                        ${error ? s.error : ''} 
                        ${s.searchInput}
                    `}
                    placeholder={placeholder}
                    {...rest}
                />

                <div className={s.loupeIcon}>
                    <LoupeIcon size={20} />
                </div>
            </div>

            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};
