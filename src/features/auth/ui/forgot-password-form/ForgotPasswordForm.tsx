'use client';
import { useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input } from '@/shared/ui';
import styles from '@/features/auth/ui/Form.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordData, forgotPasswordSchema } from '@/features/auth/model/ForgotPasswordSchem';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';
import { usePasswordRecoveryMutation } from '@/features/auth/api/authApi';

export const ForgotPasswordForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        reset,
    } = useForm<ForgotPasswordData>({
        mode: 'onTouched',
        resolver: zodResolver(forgotPasswordSchema),
    });

    const [passwordRecovery] = usePasswordRecoveryMutation();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

    const onSubmit: SubmitHandler<ForgotPasswordData> = formData => {
        setIsSuccess(() => false);
        passwordRecovery(formData)
            .unwrap()
            .then(() => {
                setIsSuccess(() => true);
                reset();
            })
            .catch(err => {
                err.data?.messages?.forEach((error: { field: keyof ForgotPasswordData; message: string }) => {
                    setError(error.field, { type: 'server', message: error.message });
                });
                recaptchaRef?.current?.reset();
            });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                type={'email'}
                label={'Email'}
                error={errors.email && errors.email.message}
                placeholder={'Name@gmail.com.'}
                {...register('email')}
                disabled={isSuccess}
            />
            <span className={styles.helperText}>
                Enter your email address and we will send you further instructions
            </span>
            {isSuccess && (
                <span className={styles.successSubmit}>
                    The link has been sent by email. If you don’t receive an email send link again
                </span>
            )}
            <Button disabled={!isValid} type={'submit'} variant={'contained'} fullWidth>
                Send Link
            </Button>

            <Button as={Link} href={'/auth/sign-in'} variant={'text'} className={styles.linkMTB30}>
                Sign In
            </Button>

            {!isSuccess && (
                <div className={styles.recaptcha}>
                    <Controller
                        name="recaptcha"
                        control={control}
                        render={({ field }) => (
                            <ReCAPTCHA
                                theme="dark"
                                hl="en"
                                sitekey={siteKey}
                                onChange={field.onChange}
                                ref={recaptchaRef}
                            />
                        )}
                    />
                </div>
            )}
        </form>
    );
};
