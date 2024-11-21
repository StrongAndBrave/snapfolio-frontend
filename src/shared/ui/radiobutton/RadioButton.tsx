import React, { ChangeEvent, ComponentPropsWithRef } from 'react';
import styles from './RadioButton.module.scss';

type Props = {
    name: string;
    value: string;
    checked: boolean;
    children?: React.ReactNode;
    onChange: (value: string) => void;
} & ComponentPropsWithRef<'input'>;

export const RadioButton = ({ name, value, checked, onChange, children, disabled, className, ...rest }: Props) => {
    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            onChange(e.currentTarget.value);
        }
    };

    return (
        <label className={`${styles.wrapper} ${className} ${disabled ? styles.disabled : ''}`}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={handleCheckboxChange}
                className={styles.radioInput}
                {...rest}
            />
            <span className={styles.customRadio} aria-hidden></span>
            {children && <span className={styles.label}>{children}</span>}
        </label>
    );
};
