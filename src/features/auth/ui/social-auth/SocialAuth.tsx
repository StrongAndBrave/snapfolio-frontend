'use client';
import React from 'react';
import styles from './SocialAuth.module.scss';
import { useLazyGithubAuthQuery } from '@/features/auth/api/authApi';
import {BtnAuth} from "@/shared/ui/btn-auth";

export const SocialAuth = () => {
    const [trigger] = useLazyGithubAuthQuery();

    return (
        <div className={styles.authButtons}>
            <BtnAuth label="google" type="button" />
            <BtnAuth onClick={()=>trigger()} label="github" type="button" />
        </div>
    );
};
