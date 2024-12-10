import { ButtonUI } from '@/shared/ui';
import styles from './HeaderWidget.module.scss';
import Link from 'next/link';
import signInSVG from '../../../../public/svg/arrow-forward.svg';
import signUpSVG from '../../../../public/svg/person-add.svg';
import settingsSVG from '../../../../public/svg/settings.svg';
import statisticsSVG from '../../../../public/svg/statisctics.svg';
import favoritesSVG from '../../../../public/svg/bookmark.svg';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
    isAuthorized: boolean;
    onLogoutClick: () => void;
    isLogoutLoading: boolean;
};

export const HeaderPopup = ({ isAuthorized, onLogoutClick, isLogoutLoading }: Props) => {
    const btnRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleEscapeKeydown = useCallback(
        (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                setIsOpen(false);
            }
        },
        [setIsOpen],
    );

    const outsideClickHandler = (evt: MouseEvent) => {
        const { target } = evt;
        if (target instanceof Node && btnRef.current && btnRef.current.contains(target)) {
            return;
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen && btnRef.current) {
            document.addEventListener('keydown', handleEscapeKeydown);
            document.addEventListener('click', outsideClickHandler);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKeydown);
            document.removeEventListener('click', outsideClickHandler);
        };
    }, [isOpen, handleEscapeKeydown]);

    return (
        <div ref={btnRef}>
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
            {isOpen && (
                <ul className={styles.menu}>
                    {isAuthorized ? (
                        <>
                            <li>
                                <ButtonUI as={Link} href="#" src={settingsSVG} alt="settings">
                                    Profile Settings
                                </ButtonUI>
                            </li>
                            <li>
                                <ButtonUI as={Link} href="#" src={statisticsSVG} alt="statistics">
                                    Statistics
                                </ButtonUI>
                            </li>
                            <li>
                                <ButtonUI as={Link} href="#" src={favoritesSVG} alt="favorites">
                                    Favorites
                                </ButtonUI>
                            </li>
                            <li>
                                <ButtonUI
                                    src={signInSVG}
                                    alt="log out"
                                    onClick={onLogoutClick}
                                    disabled={isLogoutLoading}
                                >
                                    Log Out
                                </ButtonUI>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <ButtonUI as={Link} href="/auth/sign-in" src={signInSVG} alt="log in">
                                    Log In
                                </ButtonUI>
                            </li>
                            <li>
                                <ButtonUI as={Link} href="/auth/sign-up" src={signUpSVG} alt="sign up">
                                    Sign Up
                                </ButtonUI>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </div>
    );
};
