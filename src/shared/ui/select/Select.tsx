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
    languageOptions?: Option[];
    options?: Option[];
    onChange?: (value: string) => void;
    defaultLanguage?: Option;
    value?: string;
    isDisabled?: boolean;
    children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Select = ({
    languageOptions = [],
    options = [],
    onChange,
    defaultLanguage,
    value,
    isDisabled = false,
    ...props
}: Props) => {
    const allOptions = languageOptions.length > 0 ? languageOptions : options;
    const [selectedOption, setSelectedOption] = useState<Option | null>(
        defaultLanguage || (allOptions.length > 0 ? allOptions[0] : null),
    );
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) {
            const option = allOptions.find(opt => opt.value === value);
            setSelectedOption(option || null);
        }
    }, [value, allOptions]);

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

    const hasLanguage = selectedOption && selectedOption.flag;
    const stylesSelectOptions = ` 
            ${styles.selected} ${isDisabled ? styles.disabled : ''} 
            ${isDropdownOpen ? styles.open : styles.closed} 
            ${hasLanguage ? styles['with-language'] : styles['without-language']}
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
                    {allOptions.length > 0 ? (
                        allOptions.map(option => (
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
