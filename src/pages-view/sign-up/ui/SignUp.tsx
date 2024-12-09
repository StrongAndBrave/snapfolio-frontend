'use client';
import React from 'react';
import { SignUpWidget } from '@/widgets/sign-up';
import { FormLayout } from '@/features/auth/ui/FormLayout';
import { SignUpForm, SocialAuth } from '@/features/auth';
import styles from '@/features/auth/ui/Form.module.scss';
import { Button } from '@/shared/ui';
import Link from 'next/link';

export const SignUp = () => {
    return (
        <FormLayout title={'Sign Up'}>
            <SocialAuth />
            <SignUpForm />
            <span className={styles.text}>Do you have an account?</span>
            <Button as={Link} href={'/auth/sign-in'} variant={'text'} className={styles.link}>
                Sign In
            </Button>
        </FormLayout>
    );
};
