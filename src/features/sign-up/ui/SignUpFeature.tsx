'use client';

import { Button, Checkbox, Input, ButtonUI, Password, Modal } from '@/shared/ui';
import styles from './SignUpFeature.module.scss';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formRegisterSchema, TFormRegisterSchema } from '@/shared/shemas/forms';
import { useEffect, useState } from 'react';
import { authApi } from '@/shared/services/auth/auth';
import { AuthFormLayout } from '@/widgets/layouts/auth-form-layout';

export const SignUpFeature = () => {
    const [postRegistration, { isLoading, isSuccess, error }] = authApi.usePostRegistrationMutation();
    const [showPortalRegistration, setShowPortalRegistration] = useState<boolean>(false);

    const baseURL = process.env.NODE_ENV === 'production' ? 'https://snapfolio.ru' : 'http://localhost:3000';

    const form = useForm<TFormRegisterSchema>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirm_password: '',
            agreement: true,
        },
        mode: 'onChange',
    });

    const { formState: { errors, isValid }, reset, setError } = form;

    useEffect(() => {
        if (isSuccess) {
            setShowPortalRegistration(true);
        }
        if (error) {
            if (typeof error === 'object' && 'data' in error) {
                const messages = (error.data as { messages: { message: string, field?: keyof TFormRegisterSchema }[] }).messages;
                messages.forEach((msg) => {
                    if (msg.field) {
                        setError(msg.field, { type: 'server', message: msg.message });
                    }
                });
            }
        }
    }, [isSuccess, error, setError]);

    const onSubmit = async (data: TFormRegisterSchema) => {
        await postRegistration({
            userName: data.userName,
            email: data.email,
            password: data.password,
            baseUrl: baseURL,
        });
    };

    const handleModalRegistration = () => {
        setShowPortalRegistration(prev => !prev);
        reset();
    };

    return (
        <div>
            <AuthFormLayout
                title={'Sign Up'}
                text={'Do you have an account?'}
                alternativeBtn={'Sign In'}
                hrefAltBtn={'/auth/sign-in'}
            >
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                        <Input
                            type="text"
                            label="Username"
                            placeholder="Epam11"
                            {...form.register('userName')}
                            error={errors.userName?.message}
                        />
                        <Input
                            type="email"
                            label="Email"
                            placeholder="epam@epam.com"
                            {...form.register('email')}
                            error={errors.email?.message}
                        />
                        <Password label="Password" {...form.register('password')} error={errors.password?.message} />
                        <Password
                            label="Password confirmation"
                            {...form.register('confirm_password')}
                            error={errors.confirm_password?.message}
                        />
                        <div className={styles.legal}>
                            <Checkbox {...form.register('agreement')} />
                            <p className={styles['legal-text']}>
                                I agree to the&nbsp;
                                <ButtonUI as={Link} href="/auth/terms-of-service">
                                    Terms&nbsp;of&nbsp;Service
                                </ButtonUI>
                                &nbsp;and&nbsp;
                                <ButtonUI as={Link} href="/auth/privacy-policy">
                                    Privacy&nbsp;Policy
                                </ButtonUI>
                            </p>
                            {errors.agreement && <p className={styles.error}>{errors.agreement.message}</p>}
                        </div>
                        <div className={styles['btn-wrapper']}>
                            <Button variant="contained" fullWidth type="submit" disabled={!isValid || isLoading}>
                                {isLoading ? 'In progress' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </AuthFormLayout>

            {showPortalRegistration && (
                <Modal
                    selector={'modal-root'}
                    header={'Email sent'}
                    show={showPortalRegistration}
                    onClose={handleModalRegistration}
                >
                    <>
                        <p style={{ marginBottom: '18px' }}>
                            We have sent a link to confirm your email to {form.getValues('email')}
                        </p>
                        <Button
                            style={{ marginLeft: 'auto', display: 'block' }}
                            variant="contained"
                            onClick={handleModalRegistration}
                            type="button"
                        >
                            OK
                        </Button>
                    </>
                </Modal>
            )}
        </div>
    );
};