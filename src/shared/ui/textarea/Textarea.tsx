import styles from "./textarea.module.scss";
import { ComponentPropsWithoutRef } from "react";


export type TextareaProps = {
    title?: string;
    placeholder?: string;
    fullWidth?: boolean;
    error?: boolean;
    errorText?: string;
    disabled?: boolean;
} & ComponentPropsWithoutRef<'textarea'>

export default function Textarea({
    title = 'Text-area',
    placeholder = 'Text-area',
    fullWidth = true,
    error = false,
    errorText = 'Error text',
    disabled = false,
    className,
    ...rest 
}: TextareaProps) {

    return (
        <div className={styles.container} style={{ width: fullWidth ? '100%' : 'fit-content' }}>
            <span className={`${styles.title} ${disabled && styles['title--disabled']}`}>{title}</span>
            <textarea
                className={`${styles.textarea} ${error && styles.error} ${disabled && styles.disabled}`}
                style={{ width: fullWidth ? '100%' : 'auto' }}
                name={title}
                id={title}
                placeholder={placeholder}
                disabled={disabled}
                {...rest}
            />
            {error && 
                <span className={styles['error-text']}>{errorText}</span>
            }
        </div>
    );
}