'use client';
import React, { useEffect } from 'react';
import styles from './RegistrationСonfirmation.module.scss';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSignUpConfirmationMutation } from '@/features/auth/api/authApi';

export const RegistrationConfirmation = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    const email = searchParams.get('email');

    const [confirmationToken, {}] = useSignUpConfirmationMutation();

    useEffect(() => {
        if (!code) return;
        confirmationToken({ code })
            .unwrap()
            .then(() => {
                router.push('/auth/registration-success');
            })
            .catch(() => {
                router.push(`/auth/email-resending?email=${email}`);
            });
    }, [code]);

    return (
        <div className={styles.wrapper}>
            <div>Идет проверка...</div>
        </div>
    );
};
