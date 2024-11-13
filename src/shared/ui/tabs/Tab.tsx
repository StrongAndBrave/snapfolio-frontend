import { useState } from "react";
import styles from "./tab.module.scss";

export interface ButtonProps {
    primary?: boolean;
    label: string;
    onClick?: (label: string) => void;
    disabled?: boolean;
    isActive?: boolean;
}


export default function Tab({
    primary = false,
    label,
    onClick,
    disabled = false,
    isActive = false,
    ...props
}: ButtonProps) {

    const buttonView = primary ? styles['tab--primary'] : styles['tab--secondary'];

    const handleClick = () => {
        if (onClick) {
            onClick(label);
        }
    };

    return (
        <button
            type="button"
            className={`${styles.tab} ${isActive && styles.active} ${buttonView}`}
            onClick={handleClick}
            {...props}
            disabled={disabled}
        >
            {label}
        </button>
    );
}