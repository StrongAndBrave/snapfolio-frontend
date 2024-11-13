import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Button.module.scss';
import svgEnglish from '../../../../public/svg/en.svg';
import svgRussian from '../../../../public/svg/ru.svg';

/**
 * React polymorphic components with TypeScript
 * @see {@link https://itnext.io/react-polymorphic-components-with-typescript-f7ce72ea7af2 Article about polymorphic components}
 */

type Props<T extends ElementType | typeof Link> = {
    as?: T;
    children?: ReactNode;
    variant?: 'text' | 'contained' | 'outlined' | 'default';
    isLanguageBtn?: boolean;
    language?: 'en' | 'ru';
    disabled?: boolean;
    fullWidth?: boolean;
};

export const Button = <T extends ElementType | typeof Link = 'button'>({
    className,
    children,
    as,
    variant = 'default',
    isLanguageBtn = false,
    language,
    disabled = false,
    fullWidth = false,
    ...props
}: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
    const Component = as || 'button';

    const buttonClassName =
        styles.button +
        ' ' +
        (isLanguageBtn ? styles['button-language'] : styles[variant]) +
        ' ' +
        (fullWidth ? styles['full-width'] : '') +
        ' ' +
        (className ?? '');

    const child = isLanguageBtn ? (
        <>
            <Image priority src={language === 'en' ? svgEnglish : svgRussian} alt={`${language} language image`} />
            <span>{language === 'en' ? 'english' : 'russian'}</span>
        </>
    ) : (
        children
    );
    return (
        <Component className={buttonClassName} disabled={disabled} {...props}>
            {child}
        </Component>
    );
};
