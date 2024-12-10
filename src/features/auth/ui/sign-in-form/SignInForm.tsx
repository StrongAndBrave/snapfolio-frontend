'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Input, Password } from '@/shared/ui';
import styles from '@/features/auth/ui/Form.module.scss';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInData, signInSchema } from '@/features/auth/model/SignInSchem';
import { useSignInMutation } from '@/features/auth/api/authApi';

export const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
    } = useForm<SignInData>({
        mode: 'onTouched',
        resolver: zodResolver(signInSchema),
    });
    const [signIn] = useSignInMutation();
    const onSubmit: SubmitHandler<SignInData> = formData => {
        signIn(formData)
            .unwrap()
            .then()
            .catch(err => {
                if (err.status === 400) {
                    setError('email', { type: 'server', message: err.data.messages });
                    setError('password', { type: 'server', message: err.data.messages });
                }
            });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                type={'email'}
                label={'Email'}
                className={styles.field}
                error={errors.email && errors.email.message}
                {...register('email')}
            />
            <Password
                label={'Password'}
                className={styles.field}
                error={errors.password && errors.password.message}
                {...register('password')}
            />
            <Link className={styles.linkForgotPassword} href={'/auth/forgot-password'}>
                Forgot password
            </Link>
            <Button disabled={!isValid} type={'submit'} variant={'contained'} fullWidth>
                Sign In
            </Button>
        </form>
    );
};
