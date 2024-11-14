'use client';
import React, { useState, useRef, useEffect, ElementType, ReactNode } from 'react';
import styles from './Select.module.scss';

type Option = {
    value: string;
    label: string;
    flag?: string;
};

export type Props<T extends ElementType = 'div'> = {
    as?: T;
    languageOptions?: Option[];
    options?: Option[];
    onChange?: (value: string) => void;
    defaultLanguage?: Option;
    value?: string;
    isDisabled?: boolean;
    children?: ReactNode;
} & React.ComponentProps<T>;

export const Select = React.forwardRef<HTMLDivElement, Props>(
    ({
        as: Component = 'div',
        languageOptions = [],
        options = [],
        onChange,
        defaultLanguage,
        value,
        isDisabled = false,
        ...props
    }) => {
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
        const classNameSelectedOption = `
            ${styles.selected} ${isDisabled ? styles.disabled : ''} 
            ${isDropdownOpen ? styles.open : styles.closed} 
            ${hasLanguage ? styles.withLanguage : styles.withoutLanguage}
        `;
        return (
            <Component className={styles.customSelect} ref={selectRef} {...props}>
                <div
                    className={classNameSelectedOption}
                    onClick={() => !isDisabled && setDropdownOpen(prev => !prev)}
                    tabIndex={0}
                >
                    {selectedOption && selectedOption.flag && (
                        <img src={selectedOption.flag} alt={selectedOption.label} className={styles.flag} />
                    )}
                    {selectedOption ? selectedOption.label : 'Select an option'}
                </div>

                {isDropdownOpen && (
                    <ul className={styles.dropdown}>
                        {allOptions.length > 0 ? (
                            allOptions.map(option => (
                                <li key={option.value} onClick={() => handleChange(option)}>
                                    {option.flag && (
                                        <img src={option.flag} alt={option.label} className={styles.flag} />
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
            </Component>
        );
    },
);
