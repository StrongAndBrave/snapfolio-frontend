import React, { ComponentPropsWithRef, ChangeEvent, useState } from 'react';
import styles from './Checkbox.module.scss';

type Props = {
    checked?: boolean;
    onChangeHandler?: (checked: boolean) => void;
    children?: React.ReactNode;
} & ComponentPropsWithRef<'input'>;

export const Checkbox = ({ checked = false, onChange, onChangeHandler, children, disabled, ...rest }: Props) => {
    const [value, setValue] = useState(checked);
    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            if (onChangeHandler) onChangeHandler(e.currentTarget.checked);
            if (onChange) onChange(e);
        }

        setValue(prev => !prev);
    };

    console.log('checkbox', value);

    const handleResetFocus = (e: React.MouseEvent) => {
        (e.currentTarget as HTMLElement).blur();
    };

    return (
        <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
            <input
                type="checkbox"
                checked={value}
                onChange={handleCheckboxChange}
                disabled={disabled}
                className={styles.hiddenCheckbox}
                {...rest}
            />
            <div
                className={`${styles.checkbox} ${value ? styles.checked : ''}`}
                tabIndex={0}
                onClick={handleResetFocus}
            />
            {children && <span className={styles.label}>{children}</span>}
        </label>
    );
};
