'use client';
import { authApi } from '@/shared/services/auth/auth';
import { emailSchema, TEmailSchema } from '@/shared/shemas/forms';
import { Button, Input } from '@/shared/ui';
import { AuthFormLayout } from '@/widgets/layouts/auth-form-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './ForgotPasswordFeature.module.scss';
import Link from 'next/link';
import { Recaptcha } from '@/shared/ui/recaptcha';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

export const ForgotPasswordFeatureInner = () => {
    const [postPasswordRecovery, { isLoading, isSuccess, error }] = authApi.usePostPasswordRecoveryMutation();
    const [recaptcha, setRecaptcha] = useState<string | null>(null);
    const [errorText, setErrorText] = useState<string>('');

    // const baseURL = process.env.NODE_ENV === 'production' ? 'https://snapfolio.ru' : 'http://localhost:3000';
    const baseURL = document.location.origin;

    useEffect(() => {
        if (error && typeof error === 'object' && 'data' in error) {
            const messages = (error.data as { messages: { message: string }[] }).messages;
            setErrorText(messages[0].message);
        }
    }, [error]);

    const onChangeRecaptcha = (data: string | null) => {
        setRecaptcha(data);
    };

    const form = useForm<TEmailSchema>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
        // по ТЗ - mode: 'onBlur',
        // reValidateMode: 'onChange',
    });

    const {
        formState: { errors, isValid },
    } = form;

    const onSubmit = async (data: TEmailSchema) => {
        if (recaptcha) {
            await postPasswordRecovery({
                email: data.email,
                recaptcha,
                baseUrl: baseURL,
            });
        }
    };

    return (
        <AuthFormLayout title={'Forgot Password'} className="forgot">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                    <div>
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Epam@epam.com"
                            {...form.register('email')}
                            error={errors.email?.message}
                        />
                        <span className={styles.text}>
                            Enter your email address and we will send you further instructions{' '}
                        </span>
                        {isSuccess && (
                            <span className={styles.success}>
                                The link has been sent by email. If you don’t receive an email send link again
                            </span>
                        )}
                        {error && <span className={styles.error}>{errorText}</span>}
                    </div>
                    <div className={styles.btns}>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={isLoading || !recaptcha || !isValid || isSuccess}
                        >
                            {isLoading ? 'In Progress' : 'Send Link'}
                        </Button>
                        <Button variant="text" fullWidth as={Link} href={'/auth/sign-in'}>
                            Back to Sign In
                        </Button>
                    </div>
                    <Recaptcha onChange={onChangeRecaptcha} />
                </form>
            </FormProvider>
        </AuthFormLayout>
    );
};

export const ForgotPasswordFeature = dynamic(() => Promise.resolve(ForgotPasswordFeatureInner), {
    ssr: false,
});
