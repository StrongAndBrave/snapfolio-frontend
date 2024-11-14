import React, { useState, MouseEvent } from 'react';
import s from './Input.module.scss';

type Props = {
    name: string;
    type: 'password' | 'email' | 'text';
    color: string;
};

const Input = ({ name, type, color }: Props) => {
    const [error, setError] = useState<null | string>(null);
    const [currentType, setCurrentType] = useState(type);

    const handleChangeCurrentType = (e: MouseEvent<HTMLDivElement>) => {
        if (currentType === 'password') {
            e.currentTarget.style.color = 'grey';
            setCurrentType('text');
        } else {
            setCurrentType('password');
            e.currentTarget.style.color = 'white';
        }
    };

    return (
        <div className={s.inputWrapper}>
            <label className={s.label} style={{ color }}>
                {name}
            </label>
            <div className={s.inputContainer}>
                <input type={currentType} placeholder={name} className={s.inputField} style={{ color }} />
                {type === 'password' && (
                    <div className={s.eyeIcon} onClick={handleChangeCurrentType}>
                        &#128065;
                    </div>
                )}
            </div>

            {error && <div className={s.errorMessage}>error</div>}
        </div>
    );
};

export default Input;
