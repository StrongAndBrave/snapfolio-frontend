import styles from './textarea.module.scss';
import { ComponentPropsWithoutRef } from 'react';

export type TextareaProps = {
    label?: string;
    placeholder?: string;
    error?: boolean;
    errorText?: string;
    disabled?: boolean;
} & ComponentPropsWithoutRef<'textarea'>;

export const Textarea = ({
    label = '',
    placeholder = '',
    error = false,
    errorText = '',
    disabled = false,
    className,
    ...rest
}: TextareaProps) => {
    return (
        <div className={`${styles.container} ${className && className}`}>
            <label className={`${styles.title} ${disabled && styles['title--disabled']}`}>{label}</label>
            <textarea
                className={`${styles.textarea} ${error && styles.error} ${disabled && styles.disabled}`}
                name={label}
                id={label}
                placeholder={placeholder}
                disabled={disabled}
                {...rest}
            />
            {error && <span className={styles['error-text']}>{errorText}</span>}
        </div>
    );
};
