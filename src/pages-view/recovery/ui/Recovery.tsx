'use client';
import React, { useEffect } from 'react';
import styles from './Recovery.module.scss';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCheckRecoveryCodeMutation } from '@/features/auth/api/authApi';

export const Recovery = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const recoveryCode = searchParams.get('code');

    const [checkRecoveryCode] = useCheckRecoveryCodeMutation();

    useEffect(() => {
        if (!recoveryCode) return;
        checkRecoveryCode(recoveryCode)
            .unwrap()
            .then(data => {
                router.push(`/auth/new-password?code=${recoveryCode}`);
            })
            .catch(err => {
                router.push('/auth/forgot-password');
            });
    }, [recoveryCode]);

    return (
        <div className={styles.wrapper}>
            <div>Идет проверка...</div>
        </div>
    );
};
