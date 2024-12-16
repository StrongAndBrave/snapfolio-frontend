'use client';
import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { Button, Select } from '@/shared/ui';
import { options } from './languageOptions';
import { selectIsAuthorized } from '@/features/auth/model/authSlice';
import { useAppSelector } from '@/app/store/store';

export const Header = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized);

    return (
        <header className={styles.header}>
            <Link className={styles.logo} href={'/'}>
                Inctagram
            </Link>

            <div className={styles.headerActions}>
                <Select options={options}></Select>
                {!isAuthorized && (
                    <>
                        <Button
                            className={`${styles.headerBtn} ${styles.spacer}`}
                            as={Link}
                            href={'/auth/sign-in'}
                            variant={'text'}
                        >
                            Log in
                        </Button>
                        <Button className={styles.headerBtn} as={Link} href={'/auth/sign-up'} variant={'contained'}>
                            Sign up
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
};
