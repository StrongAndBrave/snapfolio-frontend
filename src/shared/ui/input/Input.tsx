import React, { useState, MouseEvent, useEffect, ComponentPropsWithRef } from 'react';
import s from './Input.module.scss';

type InputTypes = 'password' | 'email' | 'text' | 'search';

type Props = {
    type: InputTypes;
    error?: string;
    label?: string;
    variant: 'search' | 'text';
} & ComponentPropsWithRef<'input'>;

const Input = ({ type, error, disabled, label, ...rest }: Props) => {
    const color = 'rgb(141, 144, 148)';

    const [errorMessage, setErrorMessage] = useState<null | string>(null);

    const [inputType, setInputType] = useState<InputTypes>(type);

    useEffect(() => {
        setErrorMessage(error || null);
    }, [error]);

    const handleChangeCurrentType = (e: MouseEvent<HTMLDivElement>) => {
        if (inputType === 'password') {
            e.currentTarget.style.color = color;
            setInputType('text');
        } else {
            setInputType('password');
            e.currentTarget.style.color = 'white';
        }
    };

    const handleFocus = () => {
        setErrorMessage(null);
    };

    const InputClassName = '';

    return (
        <div className={`${s.inputWrapper} ${disabled ? s.disabled : ''}`}>
            {type !== 'search' && <label className={s.label}>{label}</label>}

            <div className={s.inputContainer}>
                <input
                    type={inputType}
                    className={`${s.inputField} ${errorMessage ? s.error : ''}  ${type === 'password' ? s.passwordInput : ''} `}
                    onFocus={handleFocus}
                    {...rest}
                />

                {type === 'password' && (
                    <div className={s.eyeIcon} onClick={handleChangeCurrentType}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21.87 11.5C21.23 10.39 17.71 4.81 11.73 5C6.2 5.14 3 10 2.13 11.5C2.04 11.65 1.99 11.82 1.99 12C1.99 12.17 2.04 12.34 2.13 12.5C2.76 13.59 6.13 19 12.02 19L12.27 19C17.79 18.86 21.01 14 21.87 12.5C21.95 12.34 22 12.17 22 12C22 11.82 21.95 11.65 21.87 11.5ZM12.22 17C7.91 17.1 5.1 13.41 4.22 12C5.22 10.39 7.83 7.09 11.83 7C16.12 6.89 18.94 10.59 19.83 12C18.79 13.61 16.22 16.9 12.22 17Z"
                                fill="currentColor"
                            />
                            <path
                                d="M12 8.5C11.3 8.5 10.63 8.7 10.05 9.08C9.47 9.47 9.03 10.02 8.76 10.66C8.5 11.3 8.43 12 8.56 12.68C8.7 13.36 9.03 13.98 9.52 14.47C10.01 14.96 10.63 15.29 11.31 15.43C11.99 15.56 12.69 15.49 13.33 15.23C13.97 14.96 14.52 14.52 14.91 13.94C15.29 13.36 15.5 12.69 15.5 12C15.5 11.07 15.13 10.18 14.47 9.52C13.81 8.86 12.92 8.5 12 8.5ZM12 13.5C11.7 13.5 11.41 13.41 11.16 13.24C10.91 13.08 10.72 12.84 10.61 12.57C10.5 12.29 10.47 11.99 10.52 11.7C10.58 11.41 10.72 11.14 10.93 10.93C11.14 10.72 11.41 10.58 11.7 10.52C11.99 10.47 12.29 10.5 12.57 10.61C12.84 10.72 13.08 10.91 13.24 11.16C13.41 11.41 13.5 11.7 13.5 12C13.5 12.39 13.34 12.77 13.06 13.06C12.77 13.34 12.39 13.5 12 13.5Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                )}

                {type === 'search' && (
                    <div className={s.loupeIcon}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.25 16.07L14.42 13.25C15.33 12.08 15.83 10.64 15.83 9.16C15.83 7.84 15.44 6.55 14.7 5.46C13.97 4.36 12.93 3.51 11.71 3C10.49 2.5 9.15 2.37 7.86 2.62C6.57 2.88 5.38 3.52 4.45 4.45C3.52 5.38 2.88 6.57 2.62 7.86C2.37 9.15 2.5 10.49 3 11.71C3.51 12.93 4.36 13.97 5.46 14.7C6.55 15.44 7.84 15.83 9.16 15.83C10.64 15.83 12.08 15.33 13.25 14.42L16.07 17.25C16.24 17.39 16.55 17.5 16.66 17.5C16.77 17.5 16.88 17.48 16.98 17.44C17.08 17.39 17.18 17.33 17.25 17.25C17.33 17.18 17.39 17.08 17.44 16.98C17.48 16.88 17.5 16.77 17.5 16.66C17.5 16.55 17.48 16.44 17.44 16.34C17.39 16.24 17.33 16.15 17.25 16.07ZM4.16 9.16C4.16 8.17 4.45 7.21 5 6.38C5.55 5.56 6.33 4.92 7.25 4.54C8.16 4.16 9.17 4.06 10.14 4.26C11.11 4.45 12 4.93 12.7 5.63C13.4 6.33 13.87 7.22 14.07 8.19C14.26 9.16 14.16 10.16 13.78 11.08C13.4 11.99 12.76 12.77 11.94 13.32C11.12 13.87 10.15 14.16 9.16 14.16C7.84 14.16 6.56 13.63 5.63 12.7C4.69 11.76 4.16 10.49 4.16 9.16Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                )}
            </div>

            <div className={s.errorMessage}>{errorMessage ? errorMessage : ''}</div>
        </div>
    );
};

export default Input;
