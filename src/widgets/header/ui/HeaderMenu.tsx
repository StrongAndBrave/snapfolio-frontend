'use client';

import { Select, NotificationBtn, Button } from '@/shared/ui';
import styles from './HeaderWidget.module.scss';
import svgEnglish from '../../../../public/svg/en.svg';
import svgRussian from '../../../../public/svg/ru.svg';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeaderPopup } from './HeaderPopup';


const OPTIONS = [
    {
        value: 'en',
        label: 'English',
        flag: svgEnglish,
    },
    {
        value: 'ru',
        label: 'Russian',
        flag: svgRussian,
    },
];

export const HeaderMenu = () => {
   const isAuthorized = false; // поменять на актуальные данные
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [windowSize, setWindowSize] = useState<{
        width?: number;
        height?: number;
    }>({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const isDesktop = (windowSize.width || Infinity) >= 767;


    return isDesktop && isAuthorized ? (
        <div className={styles.nav}>
            <NotificationBtn />
            <Select options={OPTIONS} />
        </div>
    ) : (
        <div className={styles['nav-auth']}>
            <Select options={OPTIONS} />
            {isDesktop ? (
                <div className={styles['auth-btns']}>
                    <Button variant="text" as={Link} href="/auth/sign-in">
                        Log In
                    </Button>
                    <Button variant="contained" as={Link} href="/auth/sign-up">
                        Sign Up
                    </Button>
                </div>
            ) : (
                <div className={styles['nav-mobile']}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={`${!isOpen ? styles.more : styles.open}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_301_4286)">
                                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
                                <path d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z" />
                                <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z" />
                            </g>
                            <defs>
                                <clipPath id="clip0_301_4286">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    {isOpen && <HeaderPopup />}
                </div>
            )}
        </div>
    );
};
