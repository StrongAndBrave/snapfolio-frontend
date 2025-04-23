'use client';
import { useEffect } from 'react';
import styles from './RegistrationСonfirmation.module.scss';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSignUpConfirmationMutation } from '@/features/auth/api/authApi';
import { Loader } from '@/shared/ui/loader/Loader';

export const RegistrationConfirmation = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const confirmationCode = searchParams.get('code');
    const email = searchParams.get('email');

    const [confirmationToken] = useSignUpConfirmationMutation();

    useEffect(() => {
        if (!confirmationCode) return;
        confirmationToken({ confirmationCode })
            .unwrap()
            .then(() => {
                router.push('/auth/registration-success');
            })
            .catch(() => {
                router.push(`/auth/email-resending?email=${email}`);
            });
    }, [confirmationCode, email, router, confirmationToken]);

    return (
        <div className={styles.wrapper}>
            <Loader />
        </div>
    );
};
