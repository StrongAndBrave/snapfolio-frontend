import React, { ComponentPropsWithRef, ChangeEvent } from 'react';
import styles from './Checkbox.module.scss';

type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    children?: React.ReactNode;
    className?: string;
} & ComponentPropsWithRef<'input'>;

export const Checkbox = ({ checked, onChange, children, disabled, className, ...rest }: Props) => {
    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            onChange ? onChange(e.currentTarget.checked) : '';
        }
    };

    return (
        <label className={`${styles.wrapper} ${className} ${disabled ? styles.disabled : ''}`}>
            <div className={styles.outline}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                    disabled={disabled}
                    className={styles.hiddenCheckbox}
                    {...rest}
                />
                <span className={styles.outlineBg} aria-hidden>
                    outline
                </span>
                <div className={`${styles.checkbox} ${checked ? styles.checked : ''}`} aria-hidden />
            </div>
            {children && <span className={styles.label}>{children}</span>}
        </label>
    );
};
