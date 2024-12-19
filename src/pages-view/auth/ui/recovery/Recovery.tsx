'use client';
import React, { useEffect } from 'react';
import styles from './Recovery.module.scss';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCheckRecoveryCodeMutation } from '@/features/auth/api/authApi';
import { Loader } from '@/shared/ui/loader/Loader';

export const Recovery = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const recoveryCode = searchParams.get('code');

    const [checkRecoveryCode] = useCheckRecoveryCodeMutation();

    useEffect(() => {
        if (!recoveryCode) return;
        checkRecoveryCode({ recoveryCode })
            .unwrap()
            .then(() => {
                router.push(`/auth/new-password?code=${recoveryCode}`);
            })
            .catch(() => {
                router.push('/auth/forgot-password');
            });
    }, [recoveryCode]);

    return (
        <div className={styles.wrapper}>
            <Loader />
        </div>
    );
};
