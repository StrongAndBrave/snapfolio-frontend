'use client'
import React from 'react';
import styles from './Header.module.scss'
import Link from "next/link";
import {Button, Select} from "@/shared/ui";
import {options} from './languageOptions'
import {selectIsAuthorized} from "@/app/store/authSlice";
import {useAppSelector} from "@/app/store/store";
import {useLazyMeQuery, useLogoutMutation} from "@/features/auth/api/authApi";


export const Header = () => {

    const isAuthorized = useAppSelector(selectIsAuthorized)
    const [Logout ] =useLogoutMutation()

    return (
        <header className={styles.header}>
            <Link className={styles.logo} href={'/'}>Inctagram</Link>

            <div className={styles.headerActions}>
                <Select options={options}></Select>
                {
                    !isAuthorized &&
                    <>
                        <Button as={Link} href={'/auth/sign-in'}  variant={"text"}>Log in</Button>
                        <Button as={Link} href={'/auth/sign-up'} variant={"contained"}>Sign up</Button>
                    </>
                }
                <Button onClick={()=> Logout()} variant={"contained"}>logout</Button>
            </div>
        </header>
    )
};
