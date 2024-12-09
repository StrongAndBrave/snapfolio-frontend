'use client';
import React from 'react';
import styles from './SocialAuth.module.scss';
import { Button } from '@/shared/ui';
import { useLazyGithubAuthQuery } from '@/features/auth/api/authApi';

export const SocialAuth = () => {
    const [trigger] = useLazyGithubAuthQuery();

    return (
        <div className={styles.authButtons}>
            <Button>g</Button>
            <Button onClick={() => trigger()}>g</Button>
        </div>
    );
};
