import React, { ComponentPropsWithRef, ChangeEvent } from 'react';
import styles from './Checkbox.module.scss';

type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    children?: React.ReactNode;
} & ComponentPropsWithRef<'input'>;

export const Checkbox = ({ checked, onChange, children, disabled, ...rest }: Props) => {
    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            onChange(e.currentTarget.checked);
        }
    };

    const handleResetFocus = (e: React.MouseEvent) => {
        (e.currentTarget as HTMLElement).blur();
    };

    return (
        <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                disabled={disabled}
                className={styles.hiddenCheckbox}
                {...rest}
            />
            <div
                className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
                tabIndex={0}
                onClick={handleResetFocus}
            />
            {children && <span className={styles.label}>{children}</span>}
        </label>
    );
};