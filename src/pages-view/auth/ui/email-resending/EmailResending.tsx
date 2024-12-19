'use client';
import React, { useState } from 'react';
import styles from './EmailResending.module.scss';
import { Button } from '@/shared/ui';
import Image from 'next/image';
import imgNewLink from '../../../../../public/newLink.png';
import { useSearchParams } from 'next/navigation';
import { useResendSignUpLinkMutation } from '@/features/auth/api/authApi';

export const EmailResending = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [resendSignUpLink] = useResendSignUpLinkMutation();
    const [error, setError] = useState<string | null>(null);

    const handleEmailResending = () => {
        setError(() => null);
        if (email) {
            resendSignUpLink({ email })
                .unwrap()
                .catch(err => setError(() => err.data.messages[0].message));
        }
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.title}>Email verification link expired</span>
            <p className={styles.text}>
                Looks like the verification link has expired. Not to worry, we can send the link again
            </p>
            {error && <span className={styles.error}>{error}</span>}
            <Button className={styles.btn} variant={'contained'} onClick={handleEmailResending}>
                Resend verification link
            </Button>
            <Image className={styles.img} src={imgNewLink} alt="succsess img" />
        </div>
    );
};
