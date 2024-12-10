'use client';
import dynamic from 'next/dynamic';
import { Select, NotificationBtn, Button } from '@/shared/ui';
import styles from './HeaderWidget.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeaderPopup } from './HeaderPopup';
import { authApi } from '@/shared/services/auth/auth';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/store/store';
import { logout } from '@/shared/store/authSlice';
import { OPTIONS } from '../consts';

export const HeaderMenuInner = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);
    const [postLogout, { isLoading: isLogoutLoading }] = authApi.usePostLogoutMutation();

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

    const handleLogoutClick = async () => {
        try {
            await postLogout().unwrap();
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
            }
            dispatch(logout());
            router.push('/auth/sign-in');
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }
    };

    return isDesktop && isAuthorized ? (
        <div className={styles.nav}>
            <NotificationBtn />
            <Select options={OPTIONS} />
            <Button variant="text" type="button" onClick={handleLogoutClick} disabled={isLogoutLoading}>
                Log out
            </Button>
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
                    <HeaderPopup
                        isAuthorized={isAuthorized}
                        onLogoutClick={handleLogoutClick}
                        isLogoutLoading={isLogoutLoading}
                    />
                </div>
            )}
        </div>
    );
};

export const HeaderMenu = dynamic(() => Promise.resolve(HeaderMenuInner), {
    ssr: false,
});
