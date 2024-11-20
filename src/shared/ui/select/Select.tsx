'use client';
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './Select.module.scss';
import Image from 'next/image';

type Option = {
    value: string;
    label: string;
    flag?: string;
};

export type Props = {
    options?: Option[];
    onChange?: (value: string) => void;
    value?: string;
    isDisabled?: boolean;
    children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Select = ({ options = [], onChange, value, isDisabled = false, ...props }: Props) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(options.length > 0 ? options[0] : null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) {
            const option = options.find(opt => opt.value === value);
            setSelectedOption(option || null);
        }
    }, [value, options]);

    const handleChange = (option: Option) => {
        setSelectedOption(option);
        setDropdownOpen(false);
        if (onChange) {
            onChange(option.value);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const hasFlag = selectedOption?.flag;
    const hasFlagIcon = selectedOption?.label.length === 0;
    const stylesSelectOptions = ` 
            ${styles.selected} ${isDisabled ? styles.disabled : ''} 
            ${isDropdownOpen ? styles.open : styles.closed} 
            ${hasFlag ? styles['with-language'] : styles['without-language']}
            ${hasFlagIcon && hasFlag ? styles['with-language-icon'] : ''}
        `;
    return (
        <div className={styles['custom-select']} ref={selectRef} {...props}>
            <div
                className={stylesSelectOptions}
                onClick={() => !isDisabled && setDropdownOpen(prev => !prev)}
                tabIndex={0}
            >
                {selectedOption && selectedOption.flag && (
                    <Image
                        width={1}
                        height={1}
                        src={selectedOption.flag}
                        alt={selectedOption.label}
                        className={styles.flag}
                    />
                )}
                {selectedOption ? selectedOption.label : 'Select an option'}
            </div>

            {isDropdownOpen && (
                <ul className={styles.dropdown}>
                    {options.length > 0 ? (
                        options.map(option => (
                            <li key={option.value} onClick={() => handleChange(option)}>
                                {option.flag && (
                                    <Image
                                        width={1}
                                        height={1}
                                        src={option.flag}
                                        alt={option.label}
                                        className={styles.flag}
                                    />
                                )}
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li>No options available</li>
                    )}
                </ul>
            )}
            {props.children}
        </div>
    );
};
