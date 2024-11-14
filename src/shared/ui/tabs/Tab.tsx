import { ComponentPropsWithoutRef, MouseEvent, MouseEventHandler } from 'react';
import styles from './tab.module.scss';

type Props = {
    primary?: boolean;
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    isActive?: boolean;
    classname?: string;
} & ComponentPropsWithoutRef<'button'>;

export const Tab = ({
    primary = false,
    label,
    onClick,
    disabled = false,
    isActive = false,
    classname,
    ...props
}: Props) => {
    const buttonView = primary ? styles.primary : styles.secondary;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <button
            type="button"
            className={`${classname && classname} ${styles.tab} ${isActive && styles.active} ${buttonView}`}
            onClick={handleClick}
            {...props}
            disabled={disabled}
        >
            {label}
        </button>
    );
};
