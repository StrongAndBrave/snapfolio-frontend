import React from 'react';
import { FormLayout } from '@/features/auth/ui/FormLayout';
import { SignInForm, SocialAuth } from '@/features/auth';
import styles from '@/features/auth/ui/Form.module.scss';
import { Button } from '@/shared/ui';
import Link from 'next/link';

export const SignIn = () => {
    return (
        <FormLayout title={'Sign In'}>
            <SocialAuth />
            <SignInForm />
            <span className={styles.text}>Do you have an account?</span>
            <Button as={Link} href={'/auth/sign-up'} variant={'text'} className={styles.link}>
                Sign Up
            </Button>
        </FormLayout>
    );
};
