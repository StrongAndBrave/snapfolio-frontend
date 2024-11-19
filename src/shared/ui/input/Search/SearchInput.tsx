'use client';

import React, { useState, ComponentPropsWithRef } from 'react';
import s from './../Input.module.scss';
import { LoupeIcon } from './icons/LoupeIcon';

type Props = {
    error?: string;
} & ComponentPropsWithRef<'input'>;

export const SearchInput = ({ error, disabled, ...rest }: Props) => {
    return (
        <div className={`${s.inputWrapper} ${disabled ? s.disabled : ''}`}>
            <div className={s.inputContainer}>
                <input
                    type={'search'}
                    className={` 
                        ${s.inputField} 
                        ${error ? s.error : ''} 
                    `}
                    placeholder="Input search"
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
